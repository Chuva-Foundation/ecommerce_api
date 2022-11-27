const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const clientRoutes = require('./routes/clientRoutes')
const port =process.env.PORT

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

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

