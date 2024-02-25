const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const cacheMiddleware = require('../middleware/cache');

const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const BlogController = require('../controllers/blogController');
router.get('/', authenticationMiddleware, cacheMiddleware, BlogController.getAllBlogs);

router.post('/blogs', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:blogId', blogController.getBlogById);
router.put('/blogs/:blogId', blogController.updateBlog);
router.delete('/blogs/:blogId', blogController.deleteBlog);
router.get('/blogs/search', blogController.searchBlogs);

module.exports = router;
