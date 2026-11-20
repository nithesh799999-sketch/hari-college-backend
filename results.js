import { Router } from 'express';
import Result from '../models/Result.js';
const router = Router();
router.get('/:registerNumber', async (req, res) => {
  const semester = Number(req.query.semester);
  if (!semester || semester < 1 || semester > 8) return res.status(400).json({ message: 'A valid semester (1–8) is required.' });
  const result = await Result.findOne({ registerNumber: req.params.registerNumber.toUpperCase(), semester, published: true }).select('-__v');
  if (!result) return res.status(404).json({ message: 'No published result found. Check the register number and semester.' });
  res.json({ result });
});
export default router;
