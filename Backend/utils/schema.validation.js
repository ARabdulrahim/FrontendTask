import Joi from 'joi';

export const userSchema= Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).max(8).required(),
});
