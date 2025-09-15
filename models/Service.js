import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String } // store Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
