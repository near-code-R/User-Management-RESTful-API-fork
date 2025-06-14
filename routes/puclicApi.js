import express from 'express';
import { registerController, loginController } from '../controller/userController.js';
const router = express.Router();

router.route('/api/user/register').post(registerController);
router.route('/api/user/login').post(loginController);
export {
    router
}