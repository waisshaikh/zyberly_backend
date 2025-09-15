import express from 'express';
import upload from '../utils/multer.js';
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', upload.single('icon'), createService);
router.get('/', getServices);
router.get('/:id', getService);
router.put('/:id', upload.single('icon'), updateService);
router.delete('/:id', deleteService);

export default router;
