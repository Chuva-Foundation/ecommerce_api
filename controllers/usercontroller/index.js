const {userSchema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');
const publicModel = require('./../../model/publicmodel');




//geting products for home page
exports.getitems = async (req,res) =>{
    const items = await  publicModel.getitems();
    //console.log(items)
    res.status(200).json(items)

}

//creating new user
exports.createuser = async (req,res)=>{

    //data validation
    const userInfo = await userSchema.validateAsync(req.body);
    //email verification
    const emailcheck = await userValidation.emailValidation(userInfo.email)

    if(emailcheck==true){
        return res.status(400).json("Email Alredy Exist!")
    }
    //user creation
    const newuser = await userModel.createuser(userInfo.first_name,userInfo.last_name,userInfo.email,userInfo.password,userInfo.birth);
    
    //console.log(newuser);
    res.status(201).json(newuser);
    //const user = await userModel
}
