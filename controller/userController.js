import { ResponseError } from '../error/responseError.js';
import { registerService, login, getUserService, updateUserService, logOutService } from '../services/userService.js';
const registerController = async (req, res, next) => {
    try {
        const result = await registerService(req.body);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        res.status(400).json({
            error: {
                message: err.message
            }
        })
    }
}
const loginController = async (req, res) => {
    try {
        const result = await login(req.body);
        if (result) {
            return res.status(200).json({
                data: {
                    message: 'Login successful',
                    token: result
                }
            })
        }
    } catch (err) {
        return res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}
const userController = async (req, res) => {
    try {
        const result = await getUserService(req.headers.authorization);
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
};
const userUpdateController = async (req, res) => {
    try {
        const result = await updateUserService(req.body, req.headers.authorization);
        res.status(200).json({
            data: {
                message: result
            }
        })
    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}
const logOutController = async (req, res) => {
    try {
        const result = await logOutService(req.headers.authorization);
        res.status(200).json({
            data: {
                message: result
            }
        })
    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    }
}

export { registerController, loginController, userController, userUpdateController, logOutController }