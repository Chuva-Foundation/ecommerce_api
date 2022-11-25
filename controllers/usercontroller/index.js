const {userSchema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');


//creating new user
exports.createuser = async (req,res)=>{
    const {first_name,last_name,email,password,birth,phone,adress}=req.body;
    //email verification
    try {
        //data validation
        await userSchema.validateAsync(req.body);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message});
    }
    //email verification
    const emailcheck = await userValidation.emailValidation(email);

    if(emailcheck==true){
        return res.status(400).json({messageError:"Email Alredy Exist!"});
    }
    //user creation
    const newuser = await userModel.createuser(first_name,last_name,email,password,birth,phone,adress);
    //console.log(newuser);
    //console.log(newuser);
    res.status(201).json(newuser);
}


