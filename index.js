const express = require('express');
require('dotenv').config();
const userControllers = require('./controllers/usercontroller');
const loginControllers = require('./controllers/logincontroller');
const auth = require('./middleware/auth');
 

const app = express();
const port =process.env.PORT || 3010

app.use(express.json());

//geting all itens for home page

//creating new users
app.post('/createuser',userControllers.createuser);
//user login
app.post('/login',loginControllers.login);

//private routes
app.use(auth)

app.get('/',userControllers.getitems);



app.listen(port,()=>{
    console.log('Server listening');
});