
const { json } = require('express');
const {productRateSchema,changePasswordSchema, updateProfileSchema} = require('./../../config/shemas');
const clientModel = require('./../../model/clientmodel');

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

exports.userInfo = async (req,res) =>{
    const userId=req.userId;

    const userInformation = await clientModel.userInformation(userId);

    if (typeof(userInformation)=="object") {
        res.status(200).json(userInformation);
    }else{
        res.status(400).json({messageError:userInformation});
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

