const db = require('./../../config/database');
const bcrypt = require('bcrypt');


class userModel {
    static async createuser(first_name,last_name,email,password,birth){
        //encrypting the password
        const passwordhash = await bcrypt.hash(password,6)
        
        //inserting user data
        try {
            await db.query("INSERT INTO users (first_name,last_name,email,password,birth) VALUES ($1,$2,$3,$4,$5)",[first_name,last_name,email,passwordhash,birth]);
  
        } catch (error) {
            console.log(error)
        }
        //returning user ID
        try {
            const userID= await db.query("SELECT id FROM users WHERE email=$1",[email])
            
            return userID.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userModel


