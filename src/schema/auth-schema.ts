import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});