const express = require('express');
require('dotenv').config();
// const dotenv = require('dotenv');
const app = express();
app.use(express.json());
// dotenv.config();
const connectDB = require('./config/connectDB');


connectDB();


app.use('/api/users', require ('./routes/route.user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => err ? console.log(err) : console.log(`server is running on port http://localhost:${PORT}`) );

