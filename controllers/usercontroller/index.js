const bcrypt = require('bcrypt');
const schema =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const publicModel = require('./../../model/publicmodel');



//geting products for home page
exports.getitems = async (req,res) =>{
    const items = await  publicModel.getitems();
    console.log(items)
    res.status(200).json(items)

}

//creating new user
exports.createuser = async (req,res)=>{

    const userInfo = await schema.validateAsync(req.body);
    
    console.log(userInfo);
    res.status(200).json(userInfo);
    //const user = await userModel
}