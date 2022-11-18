const express = require('express');
require('dotenv').config();
const userControllers = require('./controllers/usercontroller');
const loginControllers = require('./controllers/logincontroller');
const auth = require('./middleware/auth');
 

const app = express();
const port =process.env.PORT || 3010

app.use(express.json());

//geting all itens for home page
app.get('/',userControllers.getitems);

//creating new users
app.post('/createuser',userControllers.createuser);
//user login
app.post('/login',loginControllers.login);
//making order
app.post('/buy/:clientId/neworder',userControllers.neworder)

//makin single order
app.get('/order/:orderId',userControllers.getsingleorder)

//private routes
app.use(auth)


app.listen(port,()=>{
    console.log('Server listening');
});