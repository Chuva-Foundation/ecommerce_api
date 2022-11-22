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
        token:jwt.sign({ id:user.id},process.env.AUTH_KEY ,{expiresIn: '1d'})
    })
}
exports.adminlogin = async (req,res)=>{
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

    //validate authorization
    const authorization = 0 

    const message = "You are not allowed to perfom this action!"
    if (authorization==message) {
        res.status(500).json(message);
    }

    //geting user id
    const user = await userModel.userID(userInfo.email)

    //responding whith the user info and token
    res.status(202).json({
        userinfo:user,
        token:jwt.sign({ id:user.id},process.env.AUTH_KEY ,{expiresIn: '1d'})
    })
}