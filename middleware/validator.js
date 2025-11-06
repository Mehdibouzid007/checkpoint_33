const {check, validationResult}= require('express-validator');
exports.registerValidator=() => [
    check('username','username is required').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
    check('password','please enter a password with 6 or more characters').isLength({min:6})
];
exports.loginValidator=() => [

    check('email','please include a valid email').isEmail(),
    check('password','please enter a password with 6 or more characters').isLength({min:6})
];
exports.validation = (req,res,next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({errors: errors.array()});
};