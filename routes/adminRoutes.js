const {Router} = require('express');
const auth = require('./../middleware/auth');
const publicControllers = require('./../controllers/publiccontroller');
const adminControllers = require('./../controllers/admincontroller');

const routes = new Router();

routes.use(auth);

//get all items 
routes.get('/admin/items',publicControllers.getItems)
//create products
routes.post("/admin/create",adminControllers.createProduct);

//updating products
routes.put('/admin/update/:itemsId',adminControllers.updatingProducts);

//updating order status
routes.put('/admin/orderstatus',adminControllers.updateOrderStatus )

//get all orders
routes.get('/admin/orders',adminControllers.getOrders)



module.exports = routes;