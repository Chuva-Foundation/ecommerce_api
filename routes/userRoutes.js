const {Router} = require('express');
const auth = require('./../middleware/auth');
const clientControllers = require('./../controllers/clientcontroller');

const routes = new Router();

routes.use(auth);
//making order
routes.post('/buy/:clientId/neworders',clientControllers.neworder);

//geting all orders
routes.get('/get/:clientId/orders',clientControllers.getalloders);

//getingsingle order
routes.get('/get/:clientId/orders/:orderId',clientControllers.getsingleorder);

module.exports = routes;