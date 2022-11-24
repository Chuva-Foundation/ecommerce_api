const db = require('./../../../config/database');
const bcrypt = require('bcrypt');


class userValidation {
    static async emailValidation(email){
        //databse email verification
        try {
            const checkemail = await db.query("SELECT id FROM users WHERE email=$1",[email]);
            //console.log(checkemail.rows)
            //if exist return true
            if(!checkemail.rows[0]){
                return false;
            }else{
                return true;
            } 
        } catch (error) {
            console.log(error);
            return error.message;
        }   
    }
    //password verification
    static async passwordValidation (email,password){
        try {
            const passwordcheck = await db.query("SELECT password FROM users WHERE email=$1",[email]);
            const passwordValidation = await bcrypt.compare(password,passwordcheck.rows[0].password);
            
            if(!passwordValidation){
                return false;
            }else{
                return true;
            }
        } catch (error) { 
            console.log(error);
            return error.message;   
        }       
    }  

    static async isadminValidation (email){
        const statuscheck = await db.query("SELECT isadmin FROM users WHERE email=$1",[email]);
        
        if (statuscheck.rows[0].isadmin==false) {
            return false;
        }else{
            return true;
        }
    }
}

module.exports = userValidation;