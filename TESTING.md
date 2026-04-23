# Running Tests

## Prerequisites
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional but recommended) copy env file for backend-related flows:
   ```bash
   cp .env.example .env
   ```

## Backend tests
Run all backend tests:

```bash
npm run test:backend
```

This executes:

```bash
node --test server/tests/*.test.js
```

## Expected output
You should see TAP output with passing tests from:
- `server/tests/validation.test.js`
- `server/tests/auth-middleware.test.js`

## If tests fail with "Cannot find package ..."
Your dependencies were not installed correctly. Re-run:

```bash
npm install
```

Then run tests again.
