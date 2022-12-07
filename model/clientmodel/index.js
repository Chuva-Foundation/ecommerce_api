const db = require('./../../config/database');
const bcrypt = require('bcrypt');

class clientModel  {

//getting user information
static async userInformation(userId){
    try {
        const userInfo = await db.query("SELECT users.first_name AS first_name,users.last_name AS last_name,users.email AS email,users.birth AS birth,users.adress AS adress,phones.phone_number AS phone from phones,users where phones.user_id=users.id AND users.id=$1",[userId]);
        
        return userInfo.rows
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

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

};

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
};

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
};




}
module.exports = clientModel;