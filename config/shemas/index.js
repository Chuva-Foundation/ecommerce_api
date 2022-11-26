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
        .required(),
    phone: Joi.number()
        .required()
        .min(6),
    adress: Joi.string()
        .required()
        .max(200) 
});


exports.loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','cv'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
});

exports.orderSchema = Joi.object({
    user_id: Joi.number().greater(0)
        .integer()
        .positive()
        .required(),

    product_id: Joi.number()
        .integer()
        .positive()
        .required(),
    quantity: Joi.number().greater(0)
        .required()
        .positive()
        .integer(),
    price_unit: Joi.number().greater(0)
        .required()
        .positive()
        .integer()
          
});

exports.updateSchema = Joi.object({
    product_id: Joi.number()
        .required()
        .positive()
        .integer(),
    status: Joi.boolean()
        .required(),
    price: Joi.number()
        .positive()
        .required()

});

exports.itemsSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(5)
        .max(50),
    price: Joi.number()
        .positive()
        .required()
        .integer(),
    status: Joi.boolean()
        .required(),
    category_id: Joi.number()
        .required()
        .positive()
        .integer()
        
        
});

exports.cancelOrderSchema = Joi.object({ order_id: Joi.number().required().positive()});

exports.productRateSchema = Joi.object({
    client_rating: Joi.number().required().positive(),
    product_id: Joi.number().required().positive()
});

exports.changePasswordSchema = Joi.object({
    old_password:Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    new_password:Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
})

exports.updateProfileSchema = Joi.object({
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
    birth:Joi.date()
        .min('1-1-1920')
        .required(),
    phone: Joi.number()
        .required()
        .min(6),
    adress: Joi.string()
        .required()
        .max(200) 
})
exports.orderStatusUpdateSchema=Joi.object({
    order_id: Joi.number().required(),
    status_id:Joi.number().required()
});