const db = require('./../../config/database')

class publicModel{
    static async getitems(limit,offSet){

        try {
            const items = await db.query("SELECT category.name AS category_Name, products.id AS product_Id,products.name AS product_Name,products.price AS price,products.status AS available FROM category, products WHERE category.id = products.category_id LIMIT $1 OFFSET $2",[limit,offSet]);
            return items.rows;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    static async itemsCount(){
        try {
            const totalItems = await db.query("SELECT count(*) FROM products");

            return totalItems.rows[0].count;
        } catch (error) {
            console.log(error)
            return error.message
        }
    }

    
}

module.exports = publicModel;


