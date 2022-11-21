const {userSchema, orderschema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');
const userValidation = require('./../../model/usermodel/uservalidation');
const publicModel = require('./../../model/publicmodel');
const { response } = require('express');
const { object } = require('joi');




//geting products for home page
exports.getitems = async (req,res) =>{
    const items = await  publicModel.getitems();
    //console.log(items)
    res.status(200).json(items);

}

//creating new user
exports.createuser = async (req,res)=>{

    //data validation
    const userInfo = await userSchema.validateAsync(req.body);
    //email verification
    const emailcheck = await userValidation.emailValidation(userInfo.email);

    if(emailcheck==true){
        return res.status(400).json("Email Alredy Exist!");
    }
    //user creation
    const newuser = await userModel.createuser(userInfo.first_name,userInfo.last_name,userInfo.email,userInfo.password,userInfo.birth);
    
    //console.log(newuser);
    res.status(201).json(newuser);
    
}

exports.neworder = async (req,res) =>{
    //geting userID
    const userId =req.params.clientId;
    //console.log(userID);
    const order = req.body;
    const neworders = order
    const orderlength = Object.keys(order).length;
    
    //geting the order and validate it
    for (let x = 0; x <orderlength; x++) {
         await orderschema.validateAsync(order[x]);
        
    }
    
    //insert the data into the orders
    const neworder = await userModel.neworder(userId,neworders);
    //error message more accurate
    if(neworder=="Product do not exist!"){

        res.status(500).json("Could not create order, Product do not exist");
        
    };

    if (neworder=="Product is not available!"){
        res.status(500).json("Could not create order, Product is not available");   
    };
    
    
    res.status(200).json(neworder);
}
//
exports.getsingleorder = async (req,res)=>{
    const orderId =req.params.orderId;
    
    //console.log(orderId)

    const  getSingleOrder = await userModel.getSingleOrder(orderId)
/*
    const products = {
        "product_id":getSingleOrder.products[0],
        "quantity":getSingleOrder.products[1],
        "price":getSingleOrder.products[2]
    }*/
    res.status(200).json(getSingleOrder);
}


exports.getalloders = async (req,res)=>{
    const userId=req.params.clientId;
    
    const orders = await userModel.getAllOrders(userId);

    res.status(200).json(orders)
}