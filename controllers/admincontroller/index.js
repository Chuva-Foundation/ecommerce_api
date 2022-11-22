const {updateSchema,itemsSchema} =require('./../../config/shemas');
const adminModel = require('./../../model/adminmodel');

 exports.updatingproducts= async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemsId;
    const productInfo = req.body;

    const validatedInfo = updateSchema.validateAsync(productInfo);
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
    const productValidation = itemsSchema.validateAsync(productInfo);

    const product = await adminModel.createProduct(userId,productInfo);

    if (product=="You are not allowed to perfom this action!") {
        res.status(500).json("You are not allowed to perfom this action!");
    }

    res.status(200).json(product);

}
