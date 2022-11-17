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
            console.log(error)
        }   
    }
    //password verification
    static async passwordValidation (email,password){
        const passwordcheck = await db.query("SELECT password FROM users WHERE email=$1",[email]);
        //const passwordhash = await bcrypt.hash(password,6);
        //const wordhash = await bcrypt.hash(password,6);
        
        
        const passwordValidation = await bcrypt.compare(password,passwordcheck.rows[0].password);

        if(!passwordValidation){
            return false
        }else{
            return true
        }
    }  
}

module.exports = userValidation;