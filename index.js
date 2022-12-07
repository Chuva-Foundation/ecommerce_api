const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const clientRoutes = require('./routes/clientRoutes')
const ordersRoutes = require('./routes/ordersRoutes');
const port =process.env.PORT

app.use(express.json());

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

//public Routes
app.use('/api/v1',publicRoutes);

//user Routes
app.use('/api/v1',clientRoutes);

//admin routes
app.use('/api/v1',adminRoutes);

//order routes
app.use('/api/v1',ordersRoutes);

app.listen(port,()=>{
    console.log('Server Online',);
});

