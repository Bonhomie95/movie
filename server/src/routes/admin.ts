import { Router, Request, Response } from 'express';
import { Admin } from '../models/Admin';

const router = Router();

// POST /api/admin/login: Validate admin credentials from the database
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // For demo, we compare plain text (in production use hashed passwords)
    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    return res.json({ success: true, message: 'Admin login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
