import test from 'node:test';
import assert from 'node:assert/strict';
import { requireAuth, signToken } from '../src/middleware/auth.js';

function createRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

test('signToken + requireAuth sets req.user for valid token', () => {
  const token = signToken({ id: 7, email: 'pilot@example.com', username: 'pilot' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = createRes();
  let called = false;

  requireAuth(req, res, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(req.user.id, 7);
  assert.equal(res.statusCode, 200);
});

test('requireAuth rejects missing token', () => {
  const req = { headers: {} };
  const res = createRes();

  requireAuth(req, res, () => {});

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: 'Missing bearer token' });
});

test('requireAuth rejects malformed token', () => {
  const req = { headers: { authorization: 'Bearer invalid.token.value' } };
  const res = createRes();

  requireAuth(req, res, () => {});

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: 'Invalid token' });
});
