const {loginSchema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');

//user login
exports.login = async (req,res)=>{
    //data validation
    const userInfo = await loginSchema.validateAsync(req.body)
    
    //email verification
    const emailcheck = await userValidation.emailValidation(userInfo.email);
    
    //return messege if email not found
    if(!emailcheck){
        return res.status(404).json("Email not found!")
    }

    //password verification
    const passwordcheck = await userValidation.passwordValidation(userInfo.email,userInfo.password);

    if(!passwordcheck){
        return res.status(400).json("Password Invalid!");
    }

    //geting user id
    const userID = await userModel.userID(userInfo.email)

   // const token = await 

    res.status(202).json(userID)
}