const db = require('./../../config/database')

class publicModel{
    static async getitems(){

        try {
            const items = await db.query("SELECT category.id AS category_Id,category.name AS category_Name, products.id AS product_Id,products.name AS product_Name,products.price AS price,products.status AS available FROM category, products WHERE category.id = products.category_id");
                                        // select * from category, products where category.id = products.category_id;
            console.log(items.rows);
            return items.rows;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    
}

module.exports = publicModel;


