import { updateContactService, getContactService, deleteContactService } from "../services/contactService.js";
const getContactController = async (req, res) => {
    try {
        const result = await getContactService(req.headers.authorization);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}
const updateContactController = async (req, res) => {
    try {
        const result = await updateContactService(req.body, req.headers.authorization);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}
const deleteContactController = async (req, res) => {
    try {
        const result = await deleteContactService(req.headers.authorization);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}
export {
    getContactController,
    updateContactController,
    deleteContactController,
}