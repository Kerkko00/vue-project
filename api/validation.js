const {check} = require('express-validator');

/**
 * Validates account information at registration.
 * @type {ValidationChain[]}
 */
exports.signupValidation = [
    check('username', 'Name is required').not().isEmpty(),
    check('username', 'Name given in invalid form').isAlpha().isLength({min: 1, max: 30}),
    check('password', 'Password must be less than 254 characters or 6 or more characters').isLength({min: 6, max: 254})
]

/**
 * Validates account information at login.
 * @type {ValidationChain[]}
 */
exports.loginValidation = [
    check('password', 'Password must be less than 254 characters or 6 or more characters').isLength({min: 6, max: 254})
]