import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { flightSchema } from '../validation.js';

const router = Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, route_id AS "routeId", date_label AS date, duration, distance, status
       FROM flights
       WHERE user_id = $1
       ORDER BY id DESC`,
      [req.user.id]
    );
    return res.json({ flights: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const payload = flightSchema.parse(req.body);

    const inserted = await query(
      `INSERT INTO flights (user_id, route_id, date_label, duration, distance, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, route_id AS "routeId", date_label AS date, duration, distance, status`,
      [req.user.id, payload.routeId, payload.date, payload.duration, payload.distance, payload.status]
    );

    return res.status(201).json({ flight: inserted.rows[0] });
  } catch (err) {
    return next(err);
  }
});

export default router;
