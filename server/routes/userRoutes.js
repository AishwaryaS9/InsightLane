import express from "express";
import { registerUser, loginUser, socialLogin, updateUserProfile, getUserProfile, getUserProfileById, forgotPassword, resetPassword, changePassword } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/social-login", socialLogin);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.post('/change-password', auth, changePassword);

// Protected Routes
userRouter.get("/profile", auth, getUserProfile);
userRouter.put('/profile', auth, upload.single('profilePicture'), updateUserProfile);
userRouter.get('/userprofile/:id', getUserProfileById);


export default userRouter;
