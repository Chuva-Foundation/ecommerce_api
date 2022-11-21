const express = require('express');
require('dotenv').config();
const auth = require('./middleware/auth');
const userControllers = require('./controllers/usercontroller');
const loginControllers = require('./controllers/logincontroller');
 

const app = express();
const port =process.env.PORT || 3010

app.use(express.json());

//geting all itens for home page
app.get('/',userControllers.getitems);

//creating new users
app.post('/sign',userControllers.createuser);

//user login
app.post('/login',loginControllers.login);

//making order
app.post('/buy/:clientId/neworders',userControllers.neworder)


//geting all orders
app.get('/:clientId/orders',userControllers.getalloders)

//getingsingle order
app.get('/:clientId/orders/:orderId',userControllers.getsingleorder)

//

//private routes
app.use(auth)

app.listen(port,()=>{
    console.log('Server listening');
});