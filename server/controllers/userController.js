import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";
import { transporter } from "../utils/emailUtil.js";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const validRoles = ["reader", "author", "admin"];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.deleted) {
                return res.status(403).json({
                    message: "This email is associated with a deactivated account. Please contact support to reactivate.",
                });
            }
            return res.status(409).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "reader",
        });

        const token = generateToken(user);

        res.json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.deleted) {
            return res.status(403).json({ message: "This account is no longer active" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({ message: "Login successful", id: user._id, name: user.name, token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const socialLogin = async (req, res) => {
    res.json({ message: "Social login not implemented yet" });
};

export const getUserProfile = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let filter = { deleted: false };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } },
            ];
        }

        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);

        const totalUsers = await User.countDocuments(filter);
        const totalAdmins = await User.countDocuments({ role: "admin", deleted: false });
        const totalAuthors = await User.countDocuments({ role: "author", deleted: false });
        const totalReaders = await User.countDocuments({ role: "reader", deleted: false });

        const users = await User.find(filter)
            .skip((pageInt - 1) * limitInt)
            .limit(limitInt)
            .select("-password");

        res.json({
            success: true,
            totalUsers,
            totalAdmins,
            totalAuthors,
            totalReaders,
            currentPage: pageInt,
            totalPages: Math.ceil(totalUsers / limitInt),
            users,
        });
    } catch (error) {
        console.error("Error fetching user profiles:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile by ID:', error.message);
        res.status(500).json({ message: error.message });
    }
};


export const updateUserProfile = async (req, res) => {
    try {
        const { name, bio, socialLinks } = req.body;
        let profilePicture;

        if (req.file) {
            console.log('Uploading profile picture from disk...');

            const filePath = req.file.path;
            const fileBuffer = fs.readFileSync(filePath);

            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: req.file.originalname,
                folder: "/profile-pictures",
            });

            profilePicture = response.url;

            fs.unlinkSync(filePath);
            console.log('Temporary file deleted:', filePath);
        }

        const updates = {};
        if (name) updates.name = name;
        if (bio) updates.bio = bio;
        if (socialLinks) updates.socialLinks = JSON.parse(socialLinks);
        if (profilePicture) updates.profilePicture = profilePicture;

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json(user);
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ message: error.message });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = generateResetToken();
        const resetTokenExpiry = Date.now() + 3600000;

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        const resetLink = `https://insight-lane-blog.vercel.app/resetPassword/${resetToken}`;
        const htmlContent = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h1 style="font-family: 'Mulish', sans-serif; font-size: 1.5rem; font-weight: 600; display: flex; flex-wrap: wrap; margin-bottom: 20px;">
                        <span style="color: #00C2CB;">Insight</span>
                        <span style="color: #00C2CB;">Lane</span>
                    </h1>
                    <h2 style="color: #69B99D;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset for your account. Please click the button below to reset your password:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #69B99D; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you did not request this, please ignore this email. The link will expire in 1 hour.</p>
                    <p>Thank you,<br/>The InsightLane Team</p>
                </div>
            `;
        const mailOptions = {
            from: `"InsightLane" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Error in forgot password:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in reset password:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Both old and new passwords are required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.deleted) {
            return res.status(400).json({ message: "User is already soft-deleted" });
        }

        user.deleted = true;
        await user.save();

        res.json({ message: "User soft-deleted successfully", user });
    } catch (error) {
        console.error("Error in soft-deleting user:", error.message);
        res.status(500).json({ message: error.message });
    }
};

