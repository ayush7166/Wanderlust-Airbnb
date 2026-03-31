const Joi = require("joi");

const listingschema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image: Joi.string().uri().allow("").optional(),
        price:Joi.number().required().min(0),
        country:Joi.string().required(),  
        location:Joi.string().required(),
})
const reviewschema=Joi.object({
        review:Joi.object({
          comment:Joi.string().required(),
          rating:Joi.number().required().min(0).max(5),
        }).required(),
})
module.exports={listingschema ,reviewschema};