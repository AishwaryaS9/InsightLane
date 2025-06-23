import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";


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

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
        const validRoles = ["reader", "author", "admin"];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role: role || "reader", });
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
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

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
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUserProfile = async (req, res) => {
    try {
        const { bio, socialLinks } = req.body;
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

