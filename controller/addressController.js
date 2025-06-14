import { getAddressService, updateAddressService, deleteAddressService } from "../services/addressService.js";
const getAddressController = async (req, res) => {
    try {
        const result = await getAddressService(req.headers.authorization);
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
const updateAddressController = async (req, res) => {
    try {
        const result = await updateAddressService(req.body, req.headers.authorization);
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
const deleteAddressController = async (req, res) => {
    try {
        const result = await deleteAddressService(req.headers.authorization);
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
    getAddressController,
    updateAddressController,
    deleteAddressController,
}