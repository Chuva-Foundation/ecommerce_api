const {loginSchema} =require('./../../config/shemas');
const jwt = require('jsonwebtoken');
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
    const user = await userModel.userID(userInfo.email)

    //responding whith the user info and token
    res.status(202).json({
        userinfo:user,
        token:jwt.sign({ id:user.id},process.env.AUTH_KEY ||"068de8abbe69afe5dfc965aa16af93772a3eb2ab",{expiresIn: '1d'})
    })
}