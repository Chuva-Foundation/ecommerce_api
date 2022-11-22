const express = require('express');
require('dotenv').config();
const auth = require('./middleware/auth');
const publicControllers = require('./controllers/publiccontroller')
const userControllers = require('./controllers/usercontroller');
const loginControllers = require('./controllers/logincontroller');
const clientControllers = require('./controllers/clientcontroller');
const adminControllers = require('./controllers/admincontroller');
 

const app = express();
const port =process.env.PORT

app.use(express.json());

//geting all itens for home page
app.get('/get/items',publicControllers.getitems);

//creating new users
app.post('/sign',userControllers.createuser);

//user login
app.post('/login',loginControllers.login);
//admin login
app.post('/admin/login',loginControllers.adminlogin)

//making order
app.post('/buy/:clientId/neworders',clientControllers.neworder)

//geting all orders
app.get('/get/:clientId/orders',clientControllers.getalloders)

//getingsingle order
app.get('/get/:clientId/orders/:orderId',clientControllers.getsingleorder)

//ADMIN ROUTES
//create products
app.post("/admin/post/:userId/create",adminControllers.createproduct)

//updating products
app.put('/admin/put/:userId/update/:itemsId',adminControllers.updatingproducts)

app.use(auth)

//private routes

app.listen(port,()=>{
    console.log('Server listening',);
});