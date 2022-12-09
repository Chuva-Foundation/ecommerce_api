const db = require('../../config/database');

class orderModel  {
    static async getTotalOrders(userId){
        try {
            const totalOrders = await db.query('SELECT COUNT(*) FROM orders WHERE user_id=$1',[userId]);
            return totalOrders.rows[0].count;
        } catch (error) {
            console.log(error);
            return error.message;
        }
        };
    
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
        };


    static async neworder(clienteId,order){
    
    const length = Object.keys(order).length;
    //getting total price
    let totalPrice = 0;
    let failProducts = [];
    let notAvailable = [];
    try {
        
        await db.query('BEGIN');
        //inserting order
        const orderId = await db.query("INSERT INTO orders(user_id,total) VALUES($1,$2) RETURNING id", [clienteId,totalPrice]);
        
        //validate if products exist and if it is available 
    
        for (let x = 0; x <length; x++) { 
            const {product_id,quantity} = order[x];
            
        
            //validate if product exists
            const productExist = await db.query("SELECT name FROM products WHERE id=$1",[product_id]);
        
            if(!productExist.rows[0]){
                const productInfo = {
                    "product_id": product_id,
                    "name": productExist.rows[0],
                    "status":"Product do not exist"
                }
                failProducts.push(productInfo)
            }
            //validate if product is available
            const productAvailable = await db.query("SELECT status FROM products WHERE id=$1",[product_id]);
            
            if (!productAvailable.rows[0]||productAvailable.rows[0].status==false) {
               const productInfo = {
                "product_id": product_id,
                "status": "Not Available"
               };
               notAvailable.push(productInfo);
            }else{
                const priceUnit = await db.query("SELECT price FROM products WHERE id=$1",[product_id]);
                const price = quantity * Number(priceUnit.rows[0].price)
                totalPrice+=price;
                //inserting the products ordered by user
                await db.query("INSERT INTO order_products(order_id, product_id,quantity,price_unit) VALUES ($1, $2, $3, $4)", [orderId.rows[0].id,product_id,quantity,priceUnit.rows[0].price]);
            }
        }
        await db.query("UPDATE orders SET total=$1",[totalPrice]);
        await db.query('COMMIT');
        const newOrder = await db.query('SELECT  * FROM orders WHERE id=$1',[orderId.rows[0].id])
        return {
            "OrderId":newOrder.rows,
            "Not_exist":failProducts,
            "Not_Available":notAvailable
        }
    } catch (error) {
        console.log(error)
        await db.query('ROLLBACK');
        return error.message;
    }
}
    
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
        };

    static async getAllClientOrders(userId,limit,offSet){
        try {
        const orders = await db.query("SELECT orders.id AS id,orders.total AS total,orders.date AS date,orders_status.status FROM orders,orders_status WHERE orders.status_id=orders_status.id AND orders.user_id=$1 LIMIT $2 OFFSET $3",[userId,limit,offSet]);
        
        if (!orders.rows[0]) {
           return "Order does not exist!" 
        }
        return orders.rows;
        } catch (error) {
         console.log(error) ;
         return error.message;
        }

    }; 
}


module.exports = orderModel;