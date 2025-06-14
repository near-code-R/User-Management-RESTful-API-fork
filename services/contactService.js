import { contact } from "../db.js";
import { contactValidation, getContactValidation, deleteContactValidation } from "../validation/contactValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
const getContactService = async (token) => {
    try {
        const getContactRequest = await validation(getContactValidation, token);
        if (!getContactRequest?.error) {
            const result = await contact.getContact(token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }
}
const updateContactService = async (request, token) => {
    try {
        const contactRequest = await validation(contactValidation, request);
        if (!contactRequest?.error) {
            const result = await contact.updateContact(request, token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }
}
const deleteContactService = async (token) => {
    try {
        const deleteRequest = await validation(deleteContactValidation, token);
        if (!deleteRequest?.error) {
            const result = await contact.deleteContact(token);
            return result;
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err;
        throw new ResponseError(401, err.error.message);
    }

}
export {
    getContactService,
    updateContactService,
    deleteContactService
}
