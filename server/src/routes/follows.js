import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const result = await query('SELECT creator_id AS "creatorId" FROM follows WHERE user_id = $1', [req.user.id]);
    return res.json({ followedIds: result.rows.map((row) => row.creatorId) });
  } catch (err) {
    return next(err);
  }
});

router.post('/:creatorId', requireAuth, async (req, res, next) => {
  try {
    const creatorId = Number(req.params.creatorId);
    const existing = await query('SELECT 1 FROM follows WHERE user_id = $1 AND creator_id = $2', [req.user.id, creatorId]);

    if (existing.rows[0]) {
      await query('DELETE FROM follows WHERE user_id = $1 AND creator_id = $2', [req.user.id, creatorId]);
      return res.json({ following: false });
    }

    await query('INSERT INTO follows (user_id, creator_id) VALUES ($1, $2)', [req.user.id, creatorId]);
    return res.status(201).json({ following: true });
  } catch (err) {
    return next(err);
  }
});

export default router;
