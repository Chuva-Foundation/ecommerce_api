const {Router} = require('express');
const publicControllers = require('./../controllers/publiccontroller')
const userControllers = require('./../controllers/usercontroller');
const loginControllers = require('./../controllers/logincontroller');


const routes = new Router();

//geting all itens for home page
routes.get('/items',publicControllers.getItems);

//creating new users
routes.post('/users',userControllers.createuser);

//user login
routes.post('/session',loginControllers.login);

//admin login
routes.post('/admin/session',loginControllers.adminlogin);

module.exports = routes;