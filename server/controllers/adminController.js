import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5)
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });
        const dashboardData = { blogs, comments, drafts, recentBlogs }
        res.json({ success: true, dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getUsersDetails = async (req, res) => {
    try {
        const users = await User.find({}, 'name email role profilePicture createdAt')
            .sort({ createdAt: -1 })
            .lean(); 
        const formattedUsers = users.map(user => ({
            ...user,
            profilePicture: user.profilePicture || null,
        }));

        const authors = formattedUsers.filter(user => user.role === 'author');
        const readers = formattedUsers.filter(user => user.role === 'reader');
        const admins = formattedUsers.filter(user => user.role === 'admin');

        const response = {
            totalUsers: formattedUsers.length,
            totalAuthors: authors.length,
            totalReaders: readers.length,
            totalAdmins: admins.length,
            users: formattedUsers,
        };

        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


