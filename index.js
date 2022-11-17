const express = require('express');
require('dotenv').config();
const userControllers = require('./controllers/usercontroller');
const loginControllers = require('./controllers/logincontroller');
 

const app = express();
const port =process.env.PORT || 3010

app.use(express.json());

//geting all itens for home page
app.get('/',userControllers.getitems);

//creating new users
app.post('/createuser',userControllers.createuser);

app.post('/login',loginControllers.login);

app.listen(port,()=>{
    console.log('Server listening');
});