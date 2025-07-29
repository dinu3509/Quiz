const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter= require('./routes/AuthRouter');
const ProductRouter= require('./routes/ProductRouter');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

require('./Models/db')
app.use(bodyParser.json());
app.use(cors());


app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})