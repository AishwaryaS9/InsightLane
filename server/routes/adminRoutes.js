import express from 'express'
import { getAllComments, getDashboard, getUsersDetails } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import { deleteUser } from '../controllers/userController.js';
import { authorize } from '../middleware/roleMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/dashboard', auth, getDashboard);
adminRouter.get('/users', auth, getUsersDetails);
adminRouter.get('/all-comments', auth, getAllComments)
adminRouter.patch('/delete/:id', auth, authorize(['admin']), deleteUser);

export default adminRouter;