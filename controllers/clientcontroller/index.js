
const { json } = require('express');
const {orderSchema,cancelOrderSchema,productRateSchema,changePasswordSchema, updateProfileSchema} = require('./../../config/shemas');
const clientModel = require('./../../model/clientmodel');


exports.newOrder = async (req,res) =>{
    //geting userID
    const userId =req.userId;
    const order = req.body;
    const orderlength = Object.keys(order).length;
    
    //geting the order and validate schema
    try {
        for (let x = 0; x <orderlength; x++) {
            await orderSchema.validateAsync(order[x]);  
       }
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message});
    }
    
    try { 
    //insert the data into the orders
    const neworder = await clientModel.neworder(userId,order);

    if (typeof(neworder)=="object") {
        res.status(200).json(neworder);
    }else{
        res.status(404).json({messageError:neworder});
    }

    } catch (error) {
    console.log(error)
    }

};
//
exports.getsingleOrder = async (req,res)=>{
    const orderId =req.params.orderId;

    const  getSingleOrder = await clientModel.getSingleOrder(orderId)

    if (typeof(getSingleOrder)=="object") {
        res.status(200).json(getSingleOrder);
    }else{
        res.status(400).json({ messageError:getSingleOrder});
    }
};


exports.getallOrders = async (req,res)=>{
    const userId=req.userId;
    
    const orders = await clientModel.getAllOrders(userId);
    //console.log("controllers: " + orders)
    if (typeof(orders)=="object") {
        res.status(200).json(orders);
    }else{
        res.status(400).json({messageError:orders});
    }

};

exports.userInfo = async (req,res) =>{
    const userId=req.userId;

    const userInformation = await clientModel.userInformation(userId);

    if (typeof(userInformation)=="object") {
        res.status(200).json(userInformation);
    }else{
        res.status(400).json({messageError:userInformation});
    }
    
};

exports.updateInfo = async (req,res) =>{
    const userId=req.userId;
    const {first_name,last_name,email,adress,birth,phone} = req.body;

    try {
        await updateProfileSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message});
    }
    
    const updateInformation = await clientModel.updateInfo(first_name,last_name,email,adress,birth,phone,userId);

    if (typeof(updateInformation)=="object") {
        res.status(200).json(updateInformation);
    }else{
        res.status(400).json({messageError:updateInformation});
    }
    
};

exports.updatePassword = async (req,res) =>{
    const userId=req.userId;
    const {old_password,new_password} = req.body;

    
    try {
        await changePasswordSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message});
    }
    const updatePassword = await clientModel.updatePassword(old_password,new_password,userId);
    
    if (typeof(updatePassword)=="object") {
        res.status(200).json(updatePassword);
    }else{
        res.status(400).json({messageError:updatePassword});
    }
};

exports.productsRate = async (req,res) => {
    const clientId=req.userId;

    const {client_rating,product_id} = req.body;

    try {
        await productRateSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError: error.message});
    }

    
    const ratingProduct = await clientModel.ratingProduct(clientId, client_rating,product_id);
     
    if (typeof(ratingProduct)=="object"){
        res.status(200).json(ratingProduct);
    }else{
        res.status(400).json({messageError:ratingProduct});
    }

};

 exports.cancelOrder = async (req,res) => {
     const clientId = req.userId;
     const {order_id} = req.body;


     try {
        await cancelOrderSchema.validateAsync(req.body);
     } catch (error) {
        console.log(error);
        return  res.status(400).json({messageError:error.message});
     }

     const cancelOrder = await clientModel.cancelOrder(order_id,clientId);

     if (typeof(cancelOrder)=="object") {
        res.status(200).json(cancelOrder);

     }else{
        res.status(404).json({messageError:cancelOrder});
     }

 };