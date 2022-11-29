const bcrypt = require('bcrypt');
const db = require('./../../config/database');

class userModel {
    static async createuser(first_name,last_name,email,password,birth,phone,adress){
        //encrypting the password
        const passwordhash = await bcrypt.hash(password,6);
        
        //inserting user data
        try {
            await db.query("BEGIN");
            const userId = await db.query("INSERT INTO users (first_name,last_name,email,password,birth,adress) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",[first_name,last_name,email,passwordhash,birth,adress]);
            await db.query("INSERT INTO phones (phone_number,user_id) VALUES ($1,$2)",[phone,userId.rows[0].id]);
            await db.query("SELECT id,first_name,last_name from users WHERE id=$1",[userId.rows[0].id]);
            await db.query("COMMIT");
            return userId.rows[0]; 
        } catch (error) {
            console.log(error);
            await db.query("ROLLBACK");
            return error.message;
        }
    }
    //geting user info whith email
    static async userID (email){

        try {
            const userID = await db.query("SELECT id,first_name,last_name FROM users WHERE email=$1",[email]); 
            
            return userID.rows[0];
        } catch (error) {
            console.log(error);
            return error.message;
        }
        
    }
    
}

module.exports = userModel
