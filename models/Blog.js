  import mongoose from 'mongoose';

  const blogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      summary: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true, // Cloudinary URL should always be there
      },
    },
    { timestamps: true }
  );

  export default mongoose.model('Blog', blogSchema);
