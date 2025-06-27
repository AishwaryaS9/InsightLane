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
        const { search, page = 1, limit = 10 } = req.query;

        let filter = {};

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
        const totalAdmins = await User.countDocuments({ role: "admin" });
        const totalAuthors = await User.countDocuments({ role: "author" });
        const totalReaders = await User.countDocuments({ role: "reader" });

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
        const user = await User.findById(id).select('-password');

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

