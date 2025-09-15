import mongoose from 'mongoose';

// Define schema for Portfolio items
const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    video: {
      type: String, // Optional video URL
      default: '',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// Export the Portfolio model
export default mongoose.model('Portfolio', portfolioSchema);
