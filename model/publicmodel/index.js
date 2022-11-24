const db = require('./../../config/database')

class publicModel{
    static async getitems(){

        try {
            const items = await db.query("select category.id as categoryId,category.name as categoryName, products.id as productId,products.name as productName,products.price as price,products.status as availeble from category, products where category.id = products.category_id");
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


