const {Router} = require('express');
const auth = require('./../middleware/auth');
const ordersControllers = require('../controllers/ordercontroller');
const routes = new Router();


routes.use(auth)
//making order
routes.post('/orders',ordersControllers.clientSetNewOrder);

//geting all orders
routes.get('/orders',ordersControllers.clientGetAllOrders);

//getingsingle order
routes.get('/orders/:orderId',ordersControllers.clientGetSingleOrder);

//cancelOrder
routes.put('/cancel/order',ordersControllers.clientCancelOrder);

//updating order status
routes.put('/admin/orderstatus',ordersControllers.AdminUpdateOrderStatus );

//get all orders
routes.get('/admin/orders',ordersControllers.AdminGetOrders);


module.exports = routes;