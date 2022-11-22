const {Router} = require('express');
const publicControllers = require('./../controllers/publiccontroller')
const userControllers = require('./../controllers/usercontroller');
const loginControllers = require('./../controllers/logincontroller');


const routes = new Router();

//geting all itens for home page
routes.get('/get/items',publicControllers.getitems);

//creating new users
routes.post('/sign',userControllers.createuser);

//user login
routes.post('/login',loginControllers.login);

module.exports = routes;