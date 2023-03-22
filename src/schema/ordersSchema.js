import Joi from "joi";

const orderSchema = Joi.object({
    clientId: Joi.number().integer().required(),
    cakeId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).max(4).required(),
    totalPrice: Joi.number().required(),
});

export default orderSchema;