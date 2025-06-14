import { dataBase } from "../db.js";

const existTokenMiddleware = async (req, res, next) => {
    const existsToken = await dataBase.existsToken
    if (!existsToken) {
        return res.status(401).json({
            error: 'token has expired, please log in again'
        })
    }
    next()
}
const authMiddleware = async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (authorization) return next();
    return res.status(401).json({ error: 'Unauthorized' });
}

export {
    authMiddleware,
    existTokenMiddleware
}