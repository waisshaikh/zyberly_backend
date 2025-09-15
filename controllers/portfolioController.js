import Portfolio from '../models/Portfolio.js';
import cloudinary from '../utils/cloudinary.js';

/**
 * Create new portfolio item
 */
export const createPortfolio = async (req, res) => {
  try {
    let thumbnailUrl = '';
    let videoUrl = '';

    // Upload thumbnail image to Cloudinary
    if (req.files?.image) {
      const img = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: 'zyberly/portfolio' }
      );
      thumbnailUrl = img.secure_url;
    }

    // Upload optional video to Cloudinary
    if (req.files?.video) {
      const vid = await cloudinary.uploader.upload(
        req.files.video[0].path,
        { resource_type: 'video', folder: 'zyberly/portfolio' }
      );
      videoUrl = vid.secure_url;
    }

    // Create new document
    const portfolio = await Portfolio.create({
      title: req.body.title,
      category: req.body.category,
      thumbnail: thumbnailUrl,
      video: videoUrl,
    });

    res.status(201).json(portfolio);
  } catch (err) {
    console.error('Error creating portfolio:', err);
    res.status(500).json({ message: 'Failed to create portfolio item' });
  }
};

/**
 * Get all portfolio items
 */
export const getPortfolios = async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    res.status(500).json({ message: 'Failed to fetch portfolio items' });
  }
};

/**
 * Get single portfolio item by ID
 */
export const getPortfolio = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching portfolio item:', err);
    res.status(500).json({ message: 'Failed to fetch portfolio item' });
  }
};

/**
 * Update portfolio item
 */
export const updatePortfolio = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      category: req.body.category,
    };

    if (req.files?.image) {
      const img = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: 'zyberly/portfolio' }
      );
      updateData.thumbnail = img.secure_url;
    }

    if (req.files?.video) {
      const vid = await cloudinary.uploader.upload(
        req.files.video[0].path,
        { resource_type: 'video', folder: 'zyberly/portfolio' }
      );
      updateData.video = vid.secure_url;
    }

    const updated = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating portfolio item:', err);
    res.status(500).json({ message: 'Failed to update portfolio item' });
  }
};

/**
 * Delete portfolio item
 */
export const deletePortfolio = async (req, res) => {
  try {
    const deleted = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted' });
  } catch (err) {
    console.error('Error deleting portfolio item:', err);
    res.status(500).json({ message: 'Failed to delete portfolio item' });
  }
};
