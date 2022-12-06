const {orderSchema,cancelOrderSchema,orderStatusUpdateSchema} = require('../../config/shemas');
const clientModel = require('../../model/clientmodel');
const adminModel = require('../../model/adminmodel');


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
        const userId = req.userId;
        const orders = await adminModel.getAllOrders(userId);
       
        if (typeof(orders)=="object") {
        
            res.status(200).json(orders);
        }else{
            res.status(400).json(orders);
        }
}