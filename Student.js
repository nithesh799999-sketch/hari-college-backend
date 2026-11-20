import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  registerNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Student', studentSchema);
