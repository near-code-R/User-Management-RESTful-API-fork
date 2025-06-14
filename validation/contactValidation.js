import Joi from "joi";
const getContactValidation = Joi.string().max(100).required();
const contactValidation = Joi.object({
    firts_name: Joi.string().required().max(60),
    last_name: Joi.string().optional().max(40),
    phone_number: Joi.string().required().max(14),
    email: Joi.string().required().email().max(100)
})
const deleteContactValidation = Joi.string().max(100).required();
export {
    getContactValidation,
    contactValidation,
    deleteContactValidation
}