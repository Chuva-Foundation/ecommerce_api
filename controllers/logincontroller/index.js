const {loginSchema} =require('./../../config/shemas');
const jwt = require('jsonwebtoken');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');

//user login
exports.login = async (req,res)=>{
    //data validation
    const {email,password} = req.body;
    try {
       await loginSchema.validateAsync(req.body);
        
    } catch (error) {
        console.log(error);
         return res.status(400).json({messageError:error.message});
    }
    
    //email verification
    const emailcheck = await userValidation.emailValidation(email);
    
    //return messege if email not found
    if(!emailcheck){
        return res.status(404).json({messageError:"Email not found!"});
    }

    //password verification
    const passwordcheck = await userValidation.passwordValidation(email,password);

    if(!passwordcheck){
        return res.status(400).json({messageError:"Password Invalid!"});
    }

    //geting user id
    const user = await userModel.userID(email);

    //responding whith the user info and token
    res.status(202).json({
        userinfo:user,
        token:jwt.sign({ id:user.id},process.env.AUTH_KEY ,{expiresIn: '1d'})
    });
}
exports.adminlogin = async (req,res)=>{
    const {email,password} = req.body;
    //data validation
    try {
        await loginSchema.validateAsync(req.body);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message})     
    }
    
    const emailcheck = await userValidation.emailValidation(email);
    
    //return messege if email not found
    if(!emailcheck){
        return res.status(404).json({messageError:"Email not found!"});
    }

    //validate authorization
    const status = await userValidation.isadminValidation(email) ;
    //console.log(status)

    const message = "You are not allowed to perfom this action!"
    if (status==false) {
         return res.status(400).json({messageError:message});
    }

    //password verification
    const passwordcheck = await userValidation.passwordValidation(email,password);

    if(!passwordcheck){
        return res.status(400).json({messageError:"Password Invalid!"});
    }

    //geting user id
    const userId = await userModel.userID(email);
    console.log(userId)
    //responding whith the user info and token
    res.status(202).json({
        userinfo:userId,
        token:jwt.sign({ id:userId.id},process.env.AUTH_KEY ,{expiresIn: '1d'})
    });
}