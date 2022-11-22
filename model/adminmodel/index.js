const db = require('./../../config/database');

class adminModel {
    static async updateItem(userId,itemId,productsInfo){
        //console.log("Productsinfo "+productsInfo)
        try {
            const userValidation = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            
            //validating user authorization
            if (userValidation.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }
            //console.log(productsInfo.price)
            await db.query("UPDATE products SET price=$1, status=$2 WHERE id =$3",[productsInfo.price,productsInfo.status,itemId])  
            const updatedItem = await db.query("SELECT * FROM products WHERE id = $1",[itemId]);
            return updatedItem.rows[0];
        } catch (error) {
            console.log(error);
        }
       
    }

    //creating items
    static async createProduct(userId,productInfo){
        //console.log(productInfo)
        try {
            const userValidation = await db.query("SELECT isadmin FROM users WHERE id = $1",[userId]);
            
            //validating user authorization
            if (userValidation.rows[0].isadmin==false) {
                const message = "You are not allowed to perfom this action!"
                return message;
            }

            const products = await  db.query("INSERT INTO products (name,price,status,category_id) VALUES ($1, $2, $3, $4) RETURNING id",[productInfo.name,productInfo.price,productInfo.status,productInfo.category_id]);
            return products.rows[0]
        } catch (error) {
            console.log(Error)
        }

    }

}

module.exports = adminModel;