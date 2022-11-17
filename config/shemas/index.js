const Joi = require('joi');


exports.userSchema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .max(20)
        .required(),

    last_name: Joi.string()
        .min(3)
        .max(20)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','cv'] } })
        .required()
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    
    birth:Joi.date()
    .min('1-1-1920')
    .max('1-1-2004')
    .required(), 
});


exports.loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','cv'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
});


