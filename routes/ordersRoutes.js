const {Router} = require('express');
const auth = require('./../middleware/auth');
const ordersControllers = require('../controllers/ordercontroller');
const routes = new Router();


routes.use(auth)
//making order
routes.post('/orders',ordersControllers.newOrder);

//geting all orders
routes.get('/orders',ordersControllers.getallOrders);

//getingsingle order
routes.get('/orders/:orderId',ordersControllers.getsingleOrder);

//cancelOrder
routes.post('/cancel/order',ordersControllers.cancelOrder);

//updating order status
routes.put('/admin/orderstatus',ordersControllers.updateOrderStatus );

//get all orders
routes.get('/admin/orders',ordersControllers.getOrders);


module.exports = routes;