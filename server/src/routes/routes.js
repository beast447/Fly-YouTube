import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const search = req.query.search?.toString().trim();
    const values = [];
    let where = '';
    if (search) {
      values.push(`%${search.toLowerCase()}%`);
      where = `WHERE LOWER(r.dep || ' ' || r.arr || ' ' || r.name || ' ' || r.aircraft || ' ' || c.name || ' ' || c.handle) LIKE $${values.length}`;
    }

    const result = await query(
      `SELECT r.id, r.creator_id AS "creatorId", r.dep, r.arr, r.name, r.duration,
              r.distance, r.altitude, r.aircraft, r.difficulty, r.pilots,
              r.is_new AS "isNew", r.gradient
       FROM routes r
       JOIN creators c ON c.id = r.creator_id
       ${where}
       ORDER BY r.id DESC`,
      values
    );

    res.json({ routes: result.rows });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT r.id, r.creator_id AS "creatorId", r.dep, r.arr, r.name, r.duration,
              r.distance, r.altitude, r.aircraft, r.difficulty, r.pilots,
              r.is_new AS "isNew", r.gradient
       FROM routes r
       WHERE r.id = $1`,
      [req.params.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Route not found' });
    }

    return res.json({ route: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

export default router;
