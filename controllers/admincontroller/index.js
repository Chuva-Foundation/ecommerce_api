const { response } = require('express');
const {updateSchema,itemsSchema} =require('./../../config/shemas');
const adminModel = require('./../../model/adminmodel');

 exports.updatingproducts= async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemsId;
    const productInfo = req.body;
    
    //validating schema
    try {
         await updateSchema.validateAsync(productInfo);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
    //console.log(validatedInfo)
    const updatedItem = await adminModel.updateItem(userId, productId,productInfo);

    if (updatedItem=="You are not allowed to perfom this action!") {
        res.status(500).json("You are not allowed to perfom this action!");
    }

    res.status(200).json(updatedItem);
}

exports.createproduct = async (req,res)=>{
    const userId = req.params.userId;
    const productInfo = req.body;

    try {
        await itemsSchema.validateAsync(productInfo);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }

    const product = await adminModel.createProduct(userId,productInfo);

    if (product=="You are not allowed to perfom this action!") {
        res.status(500).json("You are not allowed to perfom this action!");
    }

    res.status(200).json(product);

}
