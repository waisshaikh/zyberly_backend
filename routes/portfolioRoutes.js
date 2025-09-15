import express from 'express';
import upload from '../utils/multer.js';
import {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';

const router = express.Router();

/**
 * @route   POST /api/portfolio
 * @desc    Create new portfolio project
 * @access  Private (add auth middleware later)
 * Expects:
 *  - image (thumbnail)
 *  - video (optional)
 */
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  createPortfolio
);

/**
 * @route   GET /api/portfolio
 * @desc    Get all portfolio projects
 * @access  Public
 */
router.get('/', getPortfolios);

/**
 * @route   GET /api/portfolio/:id
 * @desc    Get single portfolio project by ID
 * @access  Public
 */
router.get('/:id', getPortfolio);

/**
 * @route   PUT /api/portfolio/:id
 * @desc    Update portfolio project
 * @access  Private
 * Can update title, category and optionally new image/video
 */
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  updatePortfolio
);

/**
 * @route   DELETE /api/portfolio/:id
 * @desc    Delete portfolio project
 * @access  Private
 */
router.delete('/:id', deletePortfolio);

export default router;
