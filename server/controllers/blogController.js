import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs",
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' },
            ],
        });

        const image = optimizedImageUrl;
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished: false,
            author: req.user.id,
        });

        res.json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//With Search and Pagination
export const getAllBlogs = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let filter = { isPublished: true };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { subTitle: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);

        const totalBlogs = await Blog.countDocuments(filter);

        const blogs = await Blog.find(filter)
            .populate('author', 'name email role')
            .skip((pageInt - 1) * limitInt)
            .limit(limitInt);

        res.json({
            success: true,
            totalBlogs,
            currentPage: pageInt,
            totalPages: Math.ceil(totalBlogs / limitInt),
            blogs,
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId).populate('author', 'name email role');
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (req.user.role === 'author' && blog.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const addComment = async (req, res) => {
    try {
        const { blog, content } = req.body;

        const user = {
            id: req.user.id,
            name: req.user.name,
        };

        await Comment.create({ blog, user, content, isApproved: true });

        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format');
        res.json({ success: true, content });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getAuthorDashboard = async (req, res) => {
    try {
        const { id } = req.user;
        const authorBlogs = await Blog.find({ author: id }).sort({ createdAt: -1 });
        console.log('author blogs uid', JSON.stringify(id))

        const totalBlogs = authorBlogs.length;

        const drafts = authorBlogs.filter(blog => !blog.isPublished).length;

        const blogIds = authorBlogs.map(blog => blog._id);
        const comments = await Comment.find({ blog: { $in: blogIds } });

        const totalComments = comments.length;

        const approvedComments = comments.filter(comment => comment.isApproved).length;

        const dashboardData = {
            totalBlogs,
            drafts,
            totalComments,
            approvedComments,
            recentBlogs: authorBlogs.slice(0, 5),
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export const getRelatedBlogs = async (req, res) => {
    try {
        const { blogId } = req.params;
        const currentBlog = await Blog.findById(blogId);

        if (!currentBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const relatedBlogs = await Blog.find({
            _id: { $ne: blogId },
            category: currentBlog.category,
            isPublished: true,
        })
            .limit(3)
            .sort({ createdAt: -1 });

        res.json({ success: true, relatedBlogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getBlogsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        const blogs = await Blog.find({ author: authorId }).sort({ createdAt: -1 });

        if (!blogs.length) {
            return res.status(404).json({ success: false, message: "No blogs found" });
        }

        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const editBlogById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, subTitle, description, category } = req.body; 
        const imageFile = req.file; 

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (req.user.role === 'author' && blog.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to edit this blog" });
        }

        if (title) blog.title = title;
        if (subTitle) blog.subTitle = subTitle;
        if (description) blog.description = description;
        if (category) blog.category = category;

        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs",
            });

            const optimizedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' },
                ],
            });

            blog.image = optimizedImageUrl;
        }

        await blog.save();

        res.json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

