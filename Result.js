import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  registerNumber: { type: String, required: true, uppercase: true, trim: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
  academicYear: { type: String, required: true },
  subjects: [{ subject: String, marks: Number, maxMarks: { type: Number, default: 100 }, grade: String }],
  published: { type: Boolean, default: false }
}, { timestamps: true });
schema.index({ registerNumber: 1, semester: 1 }, { unique: true });
export default mongoose.model('Result', schema);
