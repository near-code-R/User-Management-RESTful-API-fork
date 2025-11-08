import { address } from "../db.js";
import { AddressValidation, getAddressValidation, deleteAddressValidation } from "../validation/addressValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
const getAddressService = async (token) => {
    try {
        const getContactRequest = await validation(getAddressValidation, token);
        if (!getContactRequest?.error) {
            const result = await address.getAddress(token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }
}
const updateAddressService = async (request, token) => {
    try {
        const contactRequest = await validation(AddressValidation, request);
        if (!contactRequest?.error) {
            const result = await address.updateAddress(request, token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }
}
const deleteAddressService = async (token) => {
    try {
        const deleteRequest = await validation(deleteAddressValidation, token);
        if (!deleteRequest?.error) {
            const result = await address.deleteAddress(token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }

}
export {
    getAddressService,
    updateAddressService,
    deleteAddressService
}

// test multiple remote and remote branc