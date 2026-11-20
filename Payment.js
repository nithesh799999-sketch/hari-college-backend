import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  studentName: { type: String, required: true }, registerNumber: { type: String, required: true, uppercase: true },
  feeType: { type: String, required: true }, amount: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  gatewayOrderId: String
}, { timestamps: true });
export default mongoose.model('Payment', schema);
