const db = require('./../../../config/database');
const bcrypt = require('bcrypt');


class userValidation {
    static async emailValidation(email){
        //databse email verification

        try {
            const checkemail = await db.query("SELECT email FROM users WHERE email=$1",[email]);
            //if exist return true
            if(!checkemail.rows[0]){

                return false;
            }else{

                return true;
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = userValidation;