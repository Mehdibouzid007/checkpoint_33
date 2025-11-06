const express = require('express');
const { register, login } = require('../controllers/user.controller');
const isAuth = require('../middleware/isAuth');
const { registerValidator: registerValidation, loginValidator: loginValidation, validation } = require('../middleware/validator');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'User API is working', endpoints: ['POST /register', 'POST /login'] });
});

router.post('/register',registerValidation(), validation ,register );

router.post('/login', loginValidation (), validation , login  );

// If you have an authentication middleware, import it above and add it as the second argument.
// e.g. const isAuth = require('../middleware/auth');
router.get("/current", isAuth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
