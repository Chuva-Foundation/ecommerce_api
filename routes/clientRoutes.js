const {Router} = require('express');
const auth = require('../middleware/auth');
const clientControllers = require('../controllers/clientcontroller');

const routes = new Router();

routes.use(auth);
//making order
routes.post('/orders',clientControllers.neworder);

//geting all orders
routes.get('/orders',clientControllers.getalloders);

//getingsingle order
routes.get('/orders/:orderId',clientControllers.getsingleorder);

//update information
routes.put('/updates',clientControllers.updateinfo)

//update password
routes.put('/password',clientControllers.updatepassword)

//get user info
routes.get('/profile',clientControllers.userinfo)


module.exports = routes;