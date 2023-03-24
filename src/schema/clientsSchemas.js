import Joi from "joi";

const clientSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().min(10).max(11).pattern(/^\d+$/).required(),
});

export default clientSchema;
