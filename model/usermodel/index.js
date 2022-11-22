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
    //seting new order
    static async neworder(clienteId,order){
        
        const length = Object.keys(order).length;
        
        //validate if products exist and if it is available 
        for (let x = 0; x <length; x++) { 
            const singleorder = order[x];

            try {
                //validate if product exists
                const productExist = await db.query("SELECT name FROM products WHERE id=$1",[singleorder.product_id]);
                if(!productExist.rows[0]){
                    const message = `Product id ${singleorder.product_id} do not exist!`;
                    return message
                }
                //validate if product is available
                const productAvailable = await db.query("SELECT status FROM products WHERE id=$1",[singleorder.product_id]);
                
                if (productAvailable.rows[0].status==false) {
                    const message = "Product is not available!"
                    return message
                }
            } catch (error) {
                console.log(error)
            }
        }
        //getting total price
        let totalPrice = 0;
        for (let z = 0; z < length; z++) {
            const products =order[z]
            const price = products.quantity * Number(products.price_unit)
            totalPrice += price 
        }
        //console.log("finalprice "+totalPrice)
        //inserting all products  
        try {  
            await db.query('BEGIN')
            //inserting order
            const newOrder = await db.query("INSERT INTO orders(user_id,total) VALUES($1,$2) RETURNING id", [clienteId,totalPrice])
            //inserting products
            for (let y = 0; y < length; y++){
                const products = order[y];
                //console.log(products)
                const productsarray =[products.product_id,products.quantity,products.price_unit]
                //console.log(productsarray)
                
                //inserting the products ordered by user
                await db.query("INSERT INTO order_products(order_id, products) VALUES ($1, $2)", [newOrder.rows[0].id,productsarray])  
            }
            await db.query('COMMIT');
            return newOrder.rows[0];
        } catch (error) {
                console.log(error)
                await db.query('ROLLBACK');
                throw error
            }
    }

    //geting single order
    static async getSingleOrder(orderId){
        try {
            //const products =[];
            const order = await db.query("SELECT products FROM order_products WHERE order_id=$1",[orderId]);
            
            if (!order.rows[0]) {
                const message = `Order ${orderId} not found!`
                return message
            }
            return order.rows
        } catch (error) {
            
        }
    }
    //getting all orders
    static async getAllOrders(userId){
        
        try {
            const orders = await db.query("SELECT id FROM orders WHERE user_id=$1",[userId]);
            
            return orders.rows
        } catch (error) {
             console.log(error) 
        }
    }
}

module.exports = userModel
