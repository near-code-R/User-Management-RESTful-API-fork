import Joi from "joi";

const registerValidation = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({ "any.only": "Confirm the password must be the same " }),
    name: Joi.string().min(3).max(20).required()
});

const loginUserValidation = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(3).max(40).required()
})

const getUserValidation = Joi.string().min(3).max(40).required();

const updateUserValidation = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(3).max(40).required(),
})
const logOutValidation = Joi.string().min(3).max(50).required();
export {
    registerValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation,
    logOutValidation,
}

