const {Router} = require('express');
const auth = require('../middleware/auth');
const clientControllers = require('../controllers/clientcontroller');

const routes = new Router();

routes.use(auth);

//update information
routes.put('/updates',clientControllers.updateInfo)

//update password
routes.put('/password',clientControllers.updatePassword)

//get user info
routes.get('/profile',clientControllers.userInfo)

//rating products
routes.post('/rate',clientControllers.productsRate)

module.exports = routes;