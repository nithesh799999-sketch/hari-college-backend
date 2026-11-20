import { Router } from 'express';
import Payment from '../models/Payment.js';
const router = Router();
router.post('/create-order', async (req, res) => {
  const { studentName, registerNumber, feeType, amount } = req.body;
  const value = Number(amount);
  if (!studentName || !registerNumber || !feeType || !Number.isFinite(value) || value <= 0) return res.status(400).json({ message: 'Enter valid student and fee details.' });
  // This records a pending request only. It does NOT charge a card/UPI or confirm payment.
  const payment = await Payment.create({ studentName, registerNumber, feeType, amount: value });
  res.status(201).json({ message: 'Fee request created. Payment gateway integration is required to collect money.', paymentRequestId: payment._id, status: payment.status });
});
export default router;
