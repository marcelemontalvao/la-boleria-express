import Joi from "joi";

const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().greater(0).required(),
    description: Joi.string().optional(),
    image: Joi.string().regex(/^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?\.(jpg|jpeg|png|gif|bmp)$/).required()
})

export default cakeSchema;