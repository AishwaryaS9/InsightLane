import express from 'express'
import { getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get('/dashboard', auth, getDashboard);

export default adminRouter;