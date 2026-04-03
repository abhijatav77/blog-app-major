import express from 'express'
import { createBlog, deleteBlog, getBlog, singleBlog, specificUserBlogs, updateBlog } from '../controller/blogController.js'
import { isAdmin, isAuthenticated } from '../middleware/userMiddleware.js';
const router = express.Router()

router.post('/create-blog',isAuthenticated, isAdmin, createBlog)
router.put('/update-blog/:id',isAuthenticated, isAdmin, updateBlog)
router.delete('/delete-blog/:id', isAuthenticated, isAdmin, deleteBlog)
router.get('/specific-blogs',isAuthenticated, isAdmin, specificUserBlogs)
router.get('/blogs', getBlog)
router.get('/single-blog/:id', singleBlog)

export default router; 