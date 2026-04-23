import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  const token = auth.slice('Bearer '.length);
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
}
