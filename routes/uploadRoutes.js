import express from 'express';
import upload from '../utils/multer.js'; 
import cloudinary from '../config/cloudinary.js'; 

const router = express.Router();

router.post('/image', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto"
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
