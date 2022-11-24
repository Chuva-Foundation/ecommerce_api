const express = require('express');
require('dotenv').config();
const app = express();
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const clientRoutes = require('./routes/clientRoutes')

app.use(express.json());
const port =process.env.PORT

//public Routes
app.use(publicRoutes);

//user Routes
app.use(clientRoutes);

//admin routes
app.use(adminRoutes);

//private routes

app.listen(port,()=>{
    console.log('Server Online',);
});