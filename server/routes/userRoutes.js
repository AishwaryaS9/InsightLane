import express from "express";
import { registerUser, loginUser, socialLogin, updateUserProfile, getUserProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/social-login", socialLogin);

// Protected Routes
userRouter.get("/profile", auth, getUserProfile);
userRouter.put('/profile', auth, upload.single('profilePicture'), updateUserProfile);

export default userRouter;
