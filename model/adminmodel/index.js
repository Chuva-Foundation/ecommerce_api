const db = require('./../../config/database');

class adminModel {
    static async updateItem(userId,itemId,productsInfo){
        //console.log("Productsinfo "+productsInfo)
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

    //creating items
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

}

module.exports = adminModel;