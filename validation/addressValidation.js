import Joi from "joi";
const getAddressValidation = Joi.string().max(100).required();
const AddressValidation = Joi.object({
    street: Joi.string().required().max(60),
    country: Joi.string().optional().max(40),
    city: Joi.string().required().max(14),
    kodePos: Joi.string().max(10).required(),
    province: Joi.string().required().max(100)
})
const deleteAddressValidation = Joi.string().max(100).required();
export {
    getAddressValidation,
    AddressValidation,
    deleteAddressValidation
}