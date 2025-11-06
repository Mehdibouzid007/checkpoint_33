const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// module.exports = { register, login };
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ errors: [{ msg: "try logging in" }] });
        }

        // Hash password
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        
        // Create new user
        const newUser = new User({ name: username, email, password: hashedPassword });
        await newUser.save();
        
        // Generate token
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
        
        res.status(201).json({ 
            success: [{ msg: "user registered" }], 
            user: newUser.toObject(), 
            token 
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(400).json({ errors: [{ msg: "could not register user" }] });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(404).json({ errors: [{ msg: "user not found or wrong password" }] });
        }
        
        // Check password
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword) {
            return res.status(401).json({ errors: [{ msg: "user not found or wrong password" }] });
        }
        
        // Generate token
        const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
        
        // Send success response
        res.status(200).json({ 
            success: [{ msg: "login successful" }], 
            user: foundUser.toObject(), 
            token 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ errors: [{ msg: "could not login user" }] });
    }
}