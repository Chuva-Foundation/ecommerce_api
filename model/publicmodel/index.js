const db = require('./../../config/database')

class publicModel{
    static async getitems(){

        try {
            const items = await db.query("SELECT * FROM products");
            return items.rows;
        } catch (error) {
            console.log(error);
        }
    }


}


module.exports = publicModel;


