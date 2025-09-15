// routes/statsRoutes.js
import express from 'express';
import Blog from '../models/Blog.js';
import Portfolio from '../models/Portfolio.js';
import Service from '../models/Service.js';

const router = express.Router();

router.get('/counts', async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalPortfolio = await Portfolio.countDocuments();
    const totalServices = await Service.countDocuments();
    res.json({ totalBlogs, totalPortfolio, totalServices });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch counts' });
  }
});

export default router;
