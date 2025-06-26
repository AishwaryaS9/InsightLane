import express from 'express';
import { authorize } from '../middleware/roleMiddleware.js';
import * as blogController from '../controllers/blogController.js';
import * as adminController from '../controllers/adminController.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Reader: View blogs and comments
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:blogId', blogController.getBlogById);
router.post('/blogs/comments', auth, authorize(['reader', 'author', 'admin']), blogController.addComment);
router.post('/blogs/allcomments', blogController.getBlogComments);
router.get('/blogs/related/:blogId', blogController.getRelatedBlogs);

// Author: Add, update their own blogs
router.post('/addblog', upload.single('image'), auth, authorize(['author', 'admin']), blogController.addBlog);
router.post('/generate', auth, authorize(['author', 'admin']), blogController.generateContent)
router.get('/author/dashboard', auth, authorize(['author']), blogController.getAuthorDashboard);
router.get('/author/:authorId', auth, authorize(['author']), blogController.getBlogsByAuthor);
router.put('/author/:id/edit', upload.single('image'), auth, authorize(['author', 'admin']), blogController.editBlogById);

// Admin: Manage all content
router.patch('/blogs/toggle-publish', auth, authorize(['admin']), blogController.togglePublish);
router.delete('/blogs', auth, authorize(['author', 'admin']), blogController.deleteBlogById);
router.post('/blogs/approve-comment', auth, authorize(['admin']), adminController.approveCommentById);
router.delete('/blogs/delete-comment', auth, authorize(['admin']), adminController.deleteCommentById);

export default router;
