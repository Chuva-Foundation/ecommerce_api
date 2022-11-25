const db = require('./../../config/database');
const bcrypt = require('bcrypt');

class clientModel  {
//seting new order
static async neworder(clienteId,order){
    
    const length = Object.keys(order).length;
    
    //validate if products exist and if it is available 
    
    for (let x = 0; x <length; x++) { 
        const {product_id} = order[x];
        
        try {
            //validate if product exists
            const productExist = await db.query("SELECT name FROM products WHERE id=$1",[product_id]);
            if(!productExist.rows[0]){
                const message = `Product id ${product_id} do not exist!`;
                return message;
            }
            //validate if product is available
            const productAvailable = await db.query("SELECT status FROM products WHERE id=$1",[product_id]);
            
            if (productAvailable.rows[0].status==false) {
                const message = `Product ${product_id} is not available!`;
                return message;
            }
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }
    //getting total price
    let totalPrice = 0;
    for (let z = 0; z < length; z++) {
        const {quantity,price_unit} =order[z]
        const price = quantity * Number(price_unit)
        totalPrice += price 
    }
    
    //inserting all products  
    try {  
        await db.query('BEGIN')
        //inserting order
        const orderId = await db.query("INSERT INTO orders(user_id,total) VALUES($1,$2) RETURNING id", [clienteId,totalPrice]);
        //inserting products
        for (let y = 0; y < length; y++){
            const {product_id,quantity,price_unit} = order[y];
            
            //inserting the products ordered by user
            await db.query("INSERT INTO order_products(order_id, product_id,quantity,price_unit) VALUES ($1, $2, $3, $4)", [orderId.rows[0].id,product_id,quantity,price_unit]);

        }
        await db.query('COMMIT');
        const newOrder = await db.query('SELECT  * FROM orders WHERE id=$1',[orderId.rows[0].id])
       
        return newOrder.rows;
    } catch (error) {
            console.log(error)
            await db.query('ROLLBACK');
            return error.message;
        }
}
//geting single order
static async getSingleOrder(orderId){
    try {
        
        const order = await db.query("SELECT product_id,quantity,price_unit FROM order_products WHERE order_id=$1",[orderId]);
        
        if (!order.rows[0]) {
            const message = `Order ${orderId} not found!`;
            return message;
        }
        return order.rows
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
//getting all orders
static async getAllOrders(userId){
    
    try {
        const orders = await db.query("SELECT orders.id AS id,orders.total AS total,orders.date AS date,orders_status.status FROM orders,orders_status WHERE orders.status_id=orders_status.id AND orders.user_id=$1",[userId]);
        
        if (!orders.rows[0]) {
           return "Order does not exist!" 
        }
        return orders.rows;
    } catch (error) {
         console.log(error) ;
         return error.message;
    }
}
//getting user information
static async userInformation(userId){
    try {
        const userInfo = await db.query("SELECT users.first_name AS first_name,users.last_name AS last_name,users.email AS email,users.birth AS birth,users.adress AS adress,phones.phone_number AS phone from phones,users where phones.user_id=users.id AND users.id=$1",[userId]);
        
        return userInfo.rows
    } catch (error) {
        console.log(error)
        return error.message;
    }
}

static async updateInfo(first_name,last_name,email,adress,birth,phone,userId){
    try {
        await db.query("BEGIN");
        await db.query("UPDATE users SET first_name=$1,last_name=$2,email=$3,adress=$4,birth=$5 WHERE id=$6",[first_name,last_name,email,adress,birth,userId]);
        await db.query("UPDATE phones SET phone_number=$1 WHERE user_Id=$2",[phone,userId]);
        await db.query("COMMIT");
        const message = {message:"Updated whith Success"}
        return message
    } catch (error) {
        console.log(error);
        await db.query("ROLLBACK");
        return error.message;
    }

}

static async updatePassword(old_password, new_password,userId){
    try {
        const oldPassword = await db.query("SELECT password FROM  users WHERE id=$1",[userId]);
        const passwordValidation = await bcrypt.compare(old_password,oldPassword.rows[0].password);
        if (!passwordValidation) {
            const message = "Wrong password!";
            return message;
        }

        const newHashPassword = await bcrypt.hash(new_password,6);
        await db.query("UPDATE users SET password=$1",[newHashPassword]);

        const message = {message:"Password updated"};
        return message;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

static async ratingProduct(clientId, userRating,productId){

    try {
        const product = await db.query("SELECT name FROM products WHERE id=$1",[productId]);
        
        if (!product.rows[0]) {
            const message = `Product ${productId} does not exist!`
            return message
        }
    } catch (error) {
        console.log(error);
        return error.message;
    }

    try {
        const isRated = await db.query("SELECT rating FROM ratings WHERE user_id=$1 and product_id=$2",[clientId,productId]);
        
        if (!isRated.rows[0]) {
            await db.query("INSERT INTO ratings VALUES ($1, $2, $3)",[userRating,clientId,productId]);
            const message = {message:"Product Rated whith Success!"};
            return message;

        }else{
            await db.query("UPDATE ratings SET rating = $1 WHERE user_id=$2 AND product_id=$3",[userRating,clientId,productId])
            const message = {message:"Product Rate Updated!"};
            return message;
        }
    } catch (error) {
        console.log(error);
        return error.message;
    }
}


static async cancelOrder(orderId,clientId) {
    try {
        
        const order = await db.query("SELECT * FROM orders WHERE id=$1",[orderId]);
        
        if (!order.rows[0]) {
            const message = "Order does not exist!";
            return message;
        }

        const orderStatus = await db.query("SELECT status_id FROM orders WHERE user_id=$1",[clientId]);
        
        if (orderStatus.rows[0].status_id==202 || orderStatus.rows[0].status_id==307) {
            const message = "This Order is in Deliver or alredy Complete!";

            return message;
        }

        const isClientOrder = await db.query("SELECT user_id FROM orders WHERE id=$1",[orderId]);
     
        if (isClientOrder.rows[0].user_id != clientId) {
            const message = "This order cannot be canceled";
            return message;
        }
        await db.query("UPDATE orders SET status_id=400 WHERE id=$1",[orderId]);

        const message = {message:`Order ${orderId} Cancelled!`}
        return message;
        
    } catch (error) {
        console.log(error)
        return error.message;
    }
}
}
module.exports = clientModel;