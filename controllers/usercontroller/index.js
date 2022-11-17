const bcrypt = require('bcrypt');
const schema =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');



exports.createuser = async (req,res)=>{

    const userInfo = await schema.validateAsync(req.body);
    
    console.log(userInfo);
    res.status(200).json(userInfo);
    //const user = await userModel
}