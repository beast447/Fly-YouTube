import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const creators = await query(
      `SELECT c.id, c.name, c.handle, c.followers, c.gradient,
              COUNT(r.id)::int AS routes
       FROM creators c
       LEFT JOIN routes r ON r.creator_id = c.id
       GROUP BY c.id
       ORDER BY c.name ASC`
    );
    res.json({ creators: creators.rows });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const creator = await query('SELECT id, name, handle, followers, gradient FROM creators WHERE id = $1', [req.params.id]);
    if (!creator.rows[0]) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    const routes = await query(
      `SELECT id, creator_id AS "creatorId", dep, arr, name, duration, distance, altitude, aircraft, difficulty, pilots, is_new AS "isNew", gradient
       FROM routes
       WHERE creator_id = $1
       ORDER BY id DESC`,
      [req.params.id]
    );

    return res.json({ creator: creator.rows[0], routes: routes.rows });
  } catch (err) {
    return next(err);
  }
});

export default router;
