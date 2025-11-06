const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('authorization');
        if (!authHeader) {
            return res.status(400).json({ errors: [{ msg: "no token , authorization denied" }] });
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decode.id });
        if (!foundUser) {
            return res.status(400).json({ errors: [{ msg: "user not found" }] });
        }
        req.user = foundUser;    
        next();

           
        
    } catch (error) {
        res.status(400).json({ errors: [{ msg: "verification failed" }] });
    }
}

module.exports = isAuth;