const db = require('./../../config/database');

class adminModel {
    static async updateProduct(userId,itemId,productsInfo){
        const {price,status} = productsInfo;
        try {
            //user validation
            const userValidation = await db.query("SELECT first_name FROM users WHERE id=$1",[userId]);
            if (!userValidation.rows[0]) {
                const message = "User do not exist";
                return message;
            }
            const adminValidation = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);

            //validating user authorization
            if (adminValidation.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }
            //validate if product exists
            const product = await db.query("SELECT name FROM products WHERE id=$1",[itemId]);
            
            if (!product.rows[0]) {
                const message = "Product do not exist!";
                return message;    
            }
            //console.log(productsInfo.price)
            await db.query("UPDATE products SET price=$1, status=$2 WHERE id =$3",[price,status,itemId])  
            const updatedItem = await db.query("SELECT * FROM products WHERE id = $1",[itemId]);
            return updatedItem.rows[0];
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    
    static async createProduct(userId,productInfo){
        //console.log(productInfo)
        const {name,price,status,category_id} = productInfo;
        try {
         
            //user validation
            const userValidation = await db.query("SELECT first_name FROM users WHERE id=$1",[userId]);
            if (!userValidation.rows[0]) {
                const message = "User do not exist";
                return message;
            }

            //validating user authorization
            const adminValidation = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            if (adminValidation.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }
            //validating category
            const category = await db.query("SELECT name FROM category WHERE id = $1",[category_id]);

            if (!category.rows[0]) {
                const message = "This category do not exist!"
                return message;
            }

            const products = await  db.query("INSERT INTO products (name,price,status,category_id) VALUES ($1, $2, $3, $4) RETURNING id",[name,price,status,category_id]);
            return products.rows[0]
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    static async updateOrderStatus(orderId,statusId,userId){
        
        try {
            //validating user authorization
            const isAdmin = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            if (isAdmin.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }

            const isOrder= await db.query("SELECT * FROM orders WHERE id=$1",[orderId]);

            if (!isOrder.rows[0]) {
                const message = "Order not found";
                return message;
            }

            const isStatus = await db.query("SELECT * from orders_status WHERE id=$1",[statusId]);
            if (!isStatus.rows[0]) {
                const message = "Status not found";
                return message;
            }

            await db.query("UPDATE orders SET status_id=$1 WHERE id=$2",[statusId,orderId]);
            const message = {message:`Order ${orderId} status updated`}
            return message
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    
    static async getAllUserOrders(userId,limit,offSet){
        try {
            //validating user authorization
            const isAdmin = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            if (isAdmin.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }
            const orders = await db.query("SELECT orders.id AS id,orders.user_id as Client_id,orders.total AS total,orders.date AS date,orders_status.status FROM orders,orders_status WHERE orders.status_id=orders_status.id LIMIT $1 OFFSET $2",[limit,offSet]);

            return orders.rows;
        } catch (error) {
            console.log(error);

            return error.message;
        }
    } 

    static async getTotalUserOrders(userId){
        try {
            //validating user authorization
            const isAdmin = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            if (isAdmin.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }
            const ordersCount = await db.query("SELECT COUNT(*) FROM orders");
            return ordersCount.rows[0].count;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}

module.exports = adminModel;