const {userSchema, orderschema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');
const publicModel = require('./../../model/publicmodel');
const { response } = require('express');




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


exports.neworder = async (req,res) =>{
    //geting userID
    const userID =req.params.clientId;
    //console.log(userID);

    //geting the order and validate it
    const orderInfo = await orderschema.validateAsync(req.body);
    //console.log(orderInfo);

    //insert the data into the orders
    const neworder = await userModel.neworder(userID,orderInfo.product_id,orderInfo.quantity,orderInfo.price_unit)

    //error message more accurate
    /*
    if(neworder=="Product do not exist!"){

        res.status(500).json("Could not create order, Product do not exist");
        throw neworder;
    }else{
        res.json(neworder);
    }
    if (neworder=="Product is not available!"){
        res.status(500).json("Could not create order, Product is not available");
        throw neworder;
    }else{
        res.json(neworder);
    }
    */
    res.json(neworder);

    
}
