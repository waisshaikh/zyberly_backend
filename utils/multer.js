import multer from 'multer';

// Use disk storage with default settings.
// Files will be stored temporarily; then uploaded to Cloudinary and removed.
const storage = multer.diskStorage({});

// You could add file filter, limits etc. if needed
// e.g., fileFilter: (req, file, cb) => { ... }

const upload = multer({ storage });

export default upload;
