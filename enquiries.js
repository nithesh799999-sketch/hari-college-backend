import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (![name, email, subject, message].every(v => typeof v === 'string' && v.trim())) return res.status(400).json({ message: 'Please complete all enquiry fields.' });
  const enquiry = await Enquiry.create({ name, email, subject, message });
  res.status(201).json({ message: 'Enquiry submitted successfully.', id: enquiry._id });
});
router.get('/', protect, adminOnly, async (_req, res) => res.json({ enquiries: await Enquiry.find().sort({ createdAt: -1 }).limit(200) }));
export default router;
