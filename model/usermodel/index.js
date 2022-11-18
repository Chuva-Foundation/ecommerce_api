const bcrypt = require('bcrypt');
const db = require('./../../config/database');

class userModel {
    static async createuser(first_name,last_name,email,password,birth){
        //encrypting the password
        const passwordhash = await bcrypt.hash(password,6);
        
        //inserting user data
        try {
           const userId = await db.query("INSERT INTO users (first_name,last_name,email,password,birth) VALUES ($1,$2,$3,$4,$5) RETURNING id",[first_name,last_name,email,passwordhash,birth]);
            return userId.rows[0]; 
        } catch (error) {
            console.log(error);
        }
    
    }

    //geting user info whith email
    static async userID (email){

        try {
            const userID = await db.query("SELECT id,first_name,last_name FROM users WHERE email=$1",[email]); 
            return userID.rows[0];
        } catch (error) {
            console.log(error);
        }
        
    }

    static async neworder(user_id,product_id,quantity,price_unit){
        //converting order in array format
        const products_ordered = [product_id,quantity,price_unit];
        //console.log("products ordered:"+products_ordered);

        //validate if products exist and if it is available 
        try {
            //validate if product exists
            const productExist = await db.query("SELECT name FROM products WHERE id=$1",[product_id]);
            if(!productExist.rows[0]){
                const message = "Product do not exist!";
                return message
            }
            //validate if product is available
            const productAvailable = await db.query("SELECT status FROM products WHERE id=$1",[product_id]);

            if (productAvailable.rows[0]==false) {
                const message = "Product is not available!"
                return message
            }
        } catch (error) {
            console.log(error)
        }
        
        try {
            await db.query('BEGIN')
            const newOrder = await db.query("INSERT INTO orders(user_id) VALUES($1) RETURNING id", [user_id])
            //console.log("order ID:"+newOrder.rows[0].id);

            //inserting the products ordered by user
            await db.query("INSERT INTO order_products(order_id, products) VALUES ($1, $2)", [newOrder.rows[0].id,products_ordered])
            
            await db.query('COMMIT');
            return newOrder.rows[0];
          } catch (error) {
            console.log(error)
            await db.query('ROLLBACK');
            throw error
          }
    }
}

module.exports = userModel


