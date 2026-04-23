import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { requireAuth, signToken } from '../middleware/auth.js';
import { credentialsSchema, loginSchema } from '../validation.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, username } = credentialsSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 12);

    const inserted = await query(
      `INSERT INTO users (email, username, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, username, created_at`,
      [email.toLowerCase(), username ?? email.split('@')[0], passwordHash]
    );

    const user = inserted.rows[0];
    const token = signToken(user);
    return res.status(201).json({ token, user });
  } catch (err) {
    if (err?.code === '23505') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const result = await query(
      `SELECT id, email, username, password_hash, created_at
       FROM users
       WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user);
    return res.json({ token, user: { id: user.id, email: user.email, username: user.username, created_at: user.created_at } });
  } catch (err) {
    return next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const result = await query('SELECT id, email, username, created_at FROM users WHERE id = $1', [req.user.id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

export default router;
