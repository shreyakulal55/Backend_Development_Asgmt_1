const Blog = require('../Models/blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog post
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog post
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search blog posts
exports.searchBlogs = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Blog.find({ $text: { $search: query } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
