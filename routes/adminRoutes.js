const {Router} = require('express');
const auth = require('./../middleware/auth');
const publicControllers = require('./../controllers/publiccontroller');
const loginControllers = require('./../controllers/logincontroller');
const adminControllers = require('./../controllers/admincontroller');

const routes = new Router();

//admin login
routes.post('/admin/login',loginControllers.adminlogin);

routes.use(auth);

//get all items 
routes.get('/admin/get/items',publicControllers.getitems)
//create products
routes.post("/admin/post/:userId/create",adminControllers.createproduct);

//updating products
routes.put('/admin/put/:userId/update/:itemsId',adminControllers.updatingproducts);



module.exports = routes;