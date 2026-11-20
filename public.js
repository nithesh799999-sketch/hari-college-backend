import { Router } from 'express';
const router = Router();
router.get('/courses', (_req, res) => res.json({ courses: [
  { code: 'BA', name: 'Bachelor of Arts', duration: '3 years' },
  { code: 'BSC', name: 'Bachelor of Science', duration: '3 years' }
] }));
router.get('/events', (_req, res) => res.json({ events: [], message: 'Add official college events to the database or CMS.' }));
export default router;
