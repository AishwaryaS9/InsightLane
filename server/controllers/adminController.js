import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const getDashboard = async (req, res) => {
    try {
        const recentBlogsData = await Blog.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('author', 'name')
            .lean();

        const recentBlogs = recentBlogsData.map(blog => {
            const { author, ...rest } = blog;
            return {
                ...rest,
                author: author?._id || null,
                authorName: author?.name || "Unknown",
            };
        });

        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = { blogs, comments, drafts, recentBlogs };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getAllComments = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const comments = await Comment.find({})
            .populate("blog")
            .sort({ createdAt: -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const totalComments = await Comment.countDocuments();

        res.json({
            success: true,
            data: {
                comments,
                pagination: {
                    totalComments,
                    currentPage: pageNum,
                    totalPages: Math.ceil(totalComments / limitNum),
                },
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


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

export const disApproveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: false });
        res.json({ success: true, message: "Comment disapproved successfully" })
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


