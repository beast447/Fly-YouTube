import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import creatorRoutes from './routes/creators.js';
import routeRoutes from './routes/routes.js';
import flightRoutes from './routes/flights.js';
import followRoutes from './routes/follows.js';
import { config } from './config.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/follows', followRoutes);

app.use((err, _req, res, _next) => {
  if (err?.name === 'ZodError') {
    return res.status(400).json({ error: 'Invalid request payload', details: err.issues });
  }

  console.error(err);
  return res.status(500).json({ error: 'Unexpected server error' });
});
