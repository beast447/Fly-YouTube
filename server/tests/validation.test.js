import test from 'node:test';
import assert from 'node:assert/strict';
import { credentialsSchema, loginSchema, flightSchema } from '../src/validation.js';

test('credentialsSchema accepts valid register payload', () => {
  const payload = credentialsSchema.parse({
    email: 'pilot@example.com',
    password: 'strongpass123',
    username: 'pilotOne',
  });

  assert.equal(payload.email, 'pilot@example.com');
  assert.equal(payload.username, 'pilotOne');
});

test('loginSchema rejects short passwords', () => {
  assert.throws(() => loginSchema.parse({ email: 'pilot@example.com', password: 'short' }));
});

test('flightSchema defaults status to complete', () => {
  const payload = flightSchema.parse({
    routeId: 2,
    duration: '1h 20m',
    distance: '420 nm',
    date: 'Apr 23',
  });

  assert.equal(payload.status, 'complete');
});

test('flightSchema rejects invalid status', () => {
  assert.throws(() => {
    flightSchema.parse({
      routeId: 2,
      duration: '1h 20m',
      distance: '420 nm',
      date: 'Apr 23',
      status: 'done',
    });
  });
});
