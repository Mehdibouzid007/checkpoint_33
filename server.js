const express = require('express');
require('dotenv').config();
// const dotenv = require('dotenv');
const app = express();
app.use(express.json());
// dotenv.config();
const connectDB = require('./config/connectDB');


connectDB();

// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api/users', require ('./routes/route.user'));
app.use('/api/recipes', require('./routes/route.recipe'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => err ? console.log(err) : console.log(`server is running on port http://localhost:${PORT}`) );

