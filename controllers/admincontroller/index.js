const { restart } = require('nodemon');
const {updateSchema,itemsSchema,orderStatusUpdateSchema} =require('./../../config/shemas');
const adminModel = require('./../../model/adminmodel');

 exports.updatingProducts= async (req, res) => {
    const userId = req.userId;
    const productId = req.params.itemsId;
    const productInfo = req.body;
    //validating schema
    try {
         await updateSchema.validateAsync(productInfo);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message})
    }
    //console.log(validatedInfo)
    const updatedItem = await adminModel.updateItem(userId, productId,productInfo);

    if (typeof(updatedItem)=="object") {
        res.status(200).json(updatedItem);
    }else{
        res.status(500).json({messageError:updatedItem});

    }
}

exports.createProduct = async (req,res)=>{
    const userId = req.userId;
    const productInfo = req.body;

    try {
        await itemsSchema.validateAsync(productInfo);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({messageError:error.message});
    }

    const product = await adminModel.createProduct(userId,productInfo);

    if (typeof(product)=="object") {
        res.status(200).json(product);
    }else{
        res.status(500).json({messageError: product});
    }
}

exports.updateOrderStatus = async (req,res)=>{
    const userId = req.userId;
    const {status_id,order_id} =req.body;

    try {
        await orderStatusUpdateSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error);
        return res.status(400).json({errorMessage:error.message});
    }

    const changeStatus = await adminModel.updateStatus(order_id,status_id,userId);

    if (typeof(changeStatus)=="object") {
        
        res.status(200).json(changeStatus);
    }else{
        res.status(404).json(changeStatus);
    }
}

exports.getOrders = async (req,res) => {
        //const userId = req.body.userId;
        const orders = await adminModel.getAllOrders();
       

        if (typeof(orders)=="object") {
        
            res.status(200).json(orders);
        }else{
            res.status(400).json(orders);
        }
}
    
