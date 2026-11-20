import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) return res.status(400).json({ message: 'Username, email and password are required.' });
  const student = await Student.findOne({ email: String(email).toLowerCase(), username }).select('+passwordHash');
  if (!student || !student.active || !(await bcrypt.compare(password, student.passwordHash))) return res.status(401).json({ message: 'Invalid login details.' });
  const token = jwt.sign({ id: student._id, username: student.username, role: student.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  res.json({ message: 'Login successful.', token, student: { id: student._id, username: student.username, email: student.email, registerNumber: student.registerNumber, role: student.role } });
});
router.get('/me', protect, async (req, res) => {
  const student = await Student.findById(req.user.id).select('username email registerNumber role');
  if (!student) return res.status(404).json({ message: 'Student account not found.' });
  res.json({ student });
});
router.post('/forgot-password', async (req, res) => {
  if (!req.body.email) return res.status(400).json({ message: 'Email is required.' });
  // Add a verified email provider and single-use, expiring reset tokens before enabling password resets.
  res.json({ message: 'If the account exists, password reset instructions will be sent after email service is configured.' });
});
export default router;
