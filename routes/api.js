import express from 'express';
import { authMiddleware, existTokenMiddleware } from '../middleware/authMiddleware.js';
import { logOutController, userController, userUpdateController } from '../controller/userController.js';
import { updateContactController, getContactController, deleteContactController } from '../controller/contactController.js';
import { getAddressController, updateAddressController, deleteAddressController } from '../controller/addressController.js';
const userRouter = express.Router()
userRouter.use(existTokenMiddleware);
userRouter.use(authMiddleware);
userRouter.route('/api/user/current').get(userController).patch(userUpdateController);
userRouter.route('/api/user/logout').delete(logOutController);
userRouter.route('/api/user/contact').post(updateContactController).get(getContactController).delete(deleteContactController);
userRouter.route('/api/user/address').post(updateAddressController).get(getAddressController).delete(deleteAddressController);
export {
    userRouter
}