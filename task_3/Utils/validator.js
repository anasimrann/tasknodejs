const { body, validationResult } = require('express-validator');

const checkfields =
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('email').isEmail().withMessage('Invalid email'),
        body('email').notEmpty().withMessage('Email cannot be left empty'),
        body('password').isLength({ min: 8 }).withMessage('Password cannot be less than 8 characters')
    ]

const validateResult = (req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        next();
    }

}

module.exports = { checkfields,validateResult }




