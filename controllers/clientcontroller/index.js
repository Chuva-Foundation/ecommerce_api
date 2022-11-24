
const {orderSchema} =require('./../../config/shemas');
const clientModel = require('./../../model/clientmodel');


exports.neworder = async (req,res) =>{
    //geting userID
    const userId =req.params.clientId;
    //console.log(userID);
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
    console.log(neworder)

    //error message more accurate
    if (typeof(neworder)=="object") {
        res.status(200).json(neworder);
    }else{
        res.status(400).json({messageError:neworder});
    }

    } catch (error) {
    console.log(error)
    }

}
//
exports.getsingleorder = async (req,res)=>{
    const orderId =req.params.orderId;
    
    //console.log(orderId)

    const  getSingleOrder = await clientModel.getSingleOrder(orderId)
    //console.log(typeof(getSingleOrder))
    if (typeof(getSingleOrder)=="object") {
        res.status(200).json(getSingleOrder);
    }else{
        res.status(400).json({ messageError:getSingleOrder});
    }
}


exports.getalloders = async (req,res)=>{
    const userId=req.params.clientId;
    
    const orders = await clientModel.getAllOrders(userId);
    console.log("controllers: " + orders)
    if (typeof(orders)=="object") {
        res.status(200).json(orders);
    }else{
        res.status(400).json({messageError:orders});
    }

}