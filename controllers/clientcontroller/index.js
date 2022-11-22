const {orderSchema} =require('./../../config/shemas');
const userModel = require('./../../model/usermodel');


exports.neworder = async (req,res) =>{
    //geting userID
    const userId =req.params.clientId;
    //console.log(userID);
    const order = req.body;
    const neworders = order
    const orderlength = Object.keys(order).length;
    
    //geting the order and validate it
    for (let x = 0; x <orderlength; x++) {
         await orderSchema.validateAsync(order[x]);
        
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

    res.status(200).json(getSingleOrder);
}


exports.getalloders = async (req,res)=>{
    const userId=req.params.clientId;
    
    const orders = await userModel.getAllOrders(userId);

    res.status(200).json(orders)
}