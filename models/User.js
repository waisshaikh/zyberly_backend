import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    role: { type: String, default: 'admin' }    // just in case you want roles
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
