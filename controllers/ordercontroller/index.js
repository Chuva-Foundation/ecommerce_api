const {orderSchema,cancelOrderSchema,orderStatusUpdateSchema} = require('../../config/shemas');
const orderModel = require('../../model/ordermodel')
const adminModel = require('../../model/adminmodel');


exports.clientSetNewOrder = async (req,res) =>{
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
    const neworder = await orderModel.neworder(userId,order);

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
exports.clientGetSingleOrder = async (req,res)=>{
    const orderId =req.params.orderId;

    const  getSingleOrder = await orderModel.getSingleOrder(orderId)

    if (typeof(getSingleOrder)=="object") {
        res.status(200).json(getSingleOrder);
    }else{
        res.status(400).json({ messageError:getSingleOrder});
    }
};

exports.clientGetAllOrders = async (req,res)=>{
    const userId=req.userId;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offSet = (page - 1) * limit;
    
    const orders = await orderModel.getAllClientOrders(userId,limit,offSet)
    const totalOrders = await orderModel.getTotalOrders(userId);
    //console.log("controllers: " + orders)
    if (typeof(orders)=="object") {
        res.status(200).json({
            "orders":orders,
            "limit":limit,
            "total":totalOrders
        });
    }else{
        res.status(400).json({messageError:orders});
    }

};

exports.clientCancelOrder = async (req,res) => {
    const clientId = req.userId;
    const {order_id} = req.body;


    try {
       await cancelOrderSchema.validateAsync(req.body);
    } catch (error) {
       console.log(error);
       return  res.status(400).json({messageError:error.message});
    }

    const cancelOrder = await orderModel.cancelOrder(order_id,clientId);

    if (typeof(cancelOrder)=="object") {
       res.status(200).json(cancelOrder);

    }else{
       res.status(404).json({messageError:cancelOrder});
    }
};


exports.AdminUpdateOrderStatus = async (req,res)=>{
    const userId = req.userId;
    const {status_id,order_id} =req.body;

    try {
        await orderStatusUpdateSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error);
        return res.status(400).json({errorMessage:error.message});
    }

    const changeStatus = await adminModel.updateOrderStatus(order_id,status_id,userId);

    if (typeof(changeStatus)=="object") {
        
        res.status(200).json(changeStatus);
    }else{
        res.status(404).json(changeStatus);
    }
}

exports.AdminGetOrders = async (req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offSet = (page-1) * limit;
    const userId = req.userId;
    const orders = await adminModel.getAllUserOrders(userId,limit,offSet);
    const totalOrders = await adminModel.getTotalUserOrders(userId)
       
    if (typeof(orders)=="object") {
        
        res.status(200).json({
            "orders":orders,
            "limit":limit,
            "total":totalOrders
        });
    }else{
        res.status(400).json(orders);
    }
}