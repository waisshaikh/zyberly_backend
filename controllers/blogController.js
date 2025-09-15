import Blog from '../models/Blog.js';
import cloudinary from '../utils/cloudinary.js';

// @desc Create new blog
export const createBlog = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'zyberly/blogs',
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    const blog = await Blog.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      image: imageUrl,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Blog creation failed' });
  }
};

// @desc Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Get blogs error:', err);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

// @desc Get single blog
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error('Get single blog error:', err);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

// @desc Update blog
export const updateBlog = async (req, res) => {
  try {
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) return res.status(404).json({ message: 'Blog not found' });

    let imageUrl = existingBlog.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'zyberly/blogs',
      });
      imageUrl = result.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        image: imageUrl,
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

// @desc Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};
