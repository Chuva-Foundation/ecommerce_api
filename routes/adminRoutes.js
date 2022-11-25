const {Router} = require('express');
const auth = require('./../middleware/auth');
const publicControllers = require('./../controllers/publiccontroller');
const loginControllers = require('./../controllers/logincontroller');
const adminControllers = require('./../controllers/admincontroller');

const routes = new Router();

routes.use(auth);

//get all items 
routes.get('/admin/items',publicControllers.getitems)
//create products
routes.post("/admin/create",adminControllers.createproduct);

//updating products
routes.put('/admin/update/:itemsId',adminControllers.updatingproducts);



module.exports = routes;