import { registerValidation, loginUserValidation, getUserValidation, updateUserValidation, logOutValidation } from "../validation/userValidation.js"
import { validation } from "../validation/validation.js";
import { dataBase } from "../db.js";
import { ResponseError } from "../error/responseError.js";

const registerService = async (request) => {
    try {

        const user = await validation(registerValidation, request)
        if (!user?.error) {
            const result = await dataBase.CreateDocs(user.value);
            return result

        }
    } catch (err) {
        if (err instanceof ResponseError) throw err
        throw new ResponseError(400, err.error.message)

    }

}
const login = async (request) => {
    try {

        const loginRequest = await validation(loginUserValidation, request);
        if (!loginRequest?.error) {
            const loginUser = await dataBase.checkLogin(request);
            return loginUser
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err
        throw new ResponseError(401, err.error.message)

    }

}
const getUserService = async (request) => {
    try {
        const getRequest = await validation(getUserValidation, request);
        if (!getRequest?.error) {
            const getuser = await dataBase.getUserByToken(request);
            return getuser
        }

    } catch (err) {
        if (err instanceof ResponseError) throw err
        throw new ResponseError(401, err.error.message)
    }
}
const updateUserService = async (request, token) => {
    try {
        const updateRequest = await validation(updateUserValidation, request);
        if (!updateRequest?.error) {
            const updateUser = await dataBase.updateUser(request, token);
            return updateUser
        }

    } catch (err) {
        if (err instanceof ResponseError) throw err
        throw new ResponseError(401, err.error.message)
    }
}
const logOutService = async (token) => {
    try {
        const logOutRequest = await validation(logOutValidation, token);
        if (!logOutRequest?.error) {
            const result = await dataBase.logOutUser(token);
            return result
        }
    } catch (err) {
        if (err instanceof ResponseError) throw err
        throw new ResponseError(401, err.error.message)
    }
}
export { registerService, login, getUserService, updateUserService, logOutService } 