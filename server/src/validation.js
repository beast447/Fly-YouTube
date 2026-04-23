import { z } from 'zod';

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(30).optional(),
});

export const loginSchema = credentialsSchema.pick({ email: true, password: true });

export const flightSchema = z.object({
  routeId: z.number().int().positive(),
  duration: z.string().min(2),
  distance: z.string().min(2),
  date: z.string().min(2),
  status: z.enum(['complete', 'in_progress']).default('complete'),
});
