import bcrypt from 'bcryptjs';
import { query, pool } from '../db.js';

const creators = [
  ['Captain Joe', '@captainjoe', '2.1M', 'linear-gradient(135deg,#e06820,#f0ba40)'],
  ['Mentour Pilot', '@mentourpilot', '1.8M', 'linear-gradient(135deg,#1a8abf,#22c87a)'],
  ['Sam Chui', '@samchui', '1.2M', 'linear-gradient(135deg,#a06800,#e09c18)'],
  ['Airforceproud95', '@afp95', '890K', 'linear-gradient(135deg,#344266,#5ec3f0)'],
];

const routes = [
  [1, 'EGLL', 'KJFK', 'Transatlantic Classic', '7h 22m', '3,459 nm', 'FL350', 'A320neo', 'smooth', 847, true, 'linear-gradient(160deg,#0a2a48 0%,#1a3a5c 40%,#080c14 100%)'],
  [2, 'KLAX', 'YSSY', 'Pacific Haul', '15h 40m', '7,488 nm', 'FL380', 'B777-300ER', 'turbulence', 1204, false, 'linear-gradient(160deg,#0d3020 0%,#1a2a3a 40%,#080c14 100%)'],
  [3, 'LFPG', 'OMDB', 'Paris to Dubai', '7h 05m', '3,260 nm', 'FL380', 'A380', 'smooth', 2103, false, 'linear-gradient(160deg,#1a1808 0%,#2a2014 40%,#080c14 100%)'],
  [4, 'KATL', 'KMIA', 'Southeast Connector', '1h 45m', '662 nm', 'FL280', 'B737-800', 'smooth', 412, true, 'linear-gradient(160deg,#0d1828 0%,#1a2030 40%,#080c14 100%)'],
  [1, 'EDDF', 'OMAA', 'Frankfurt to Abu Dhabi', '6h 30m', '2,980 nm', 'FL360', 'A350-900', 'smooth', 634, false, 'linear-gradient(160deg,#0a1830 0%,#102040 40%,#080c14 100%)'],
];

async function run() {
  await query('TRUNCATE follows, flights, routes, creators, users RESTART IDENTITY CASCADE');

  for (const row of creators) {
    await query('INSERT INTO creators (name, handle, followers, gradient) VALUES ($1, $2, $3, $4)', row);
  }

  for (const row of routes) {
    await query(
      `INSERT INTO routes (creator_id, dep, arr, name, duration, distance, altitude, aircraft, difficulty, pilots, is_new, gradient)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      row
    );
  }

  const passwordHash = await bcrypt.hash('pilotdemo123', 12);
  const user = await query(
    'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id',
    ['pilot@example.com', 'PilotUser', passwordHash]
  );

  const userId = user.rows[0].id;

  await query('INSERT INTO follows (user_id, creator_id) VALUES ($1, $2), ($1, $3)', [userId, 1, 2]);
  await query(
    `INSERT INTO flights (user_id, route_id, date_label, duration, distance, status)
     VALUES
      ($1, 1, 'Apr 18', '7h 31m', '3,459 nm', 'complete'),
      ($1, 3, 'Apr 10', '7h 12m', '3,260 nm', 'complete'),
      ($1, 4, 'Mar 29', '1h 48m', '662 nm', 'complete'),
      ($1, 2, 'Mar 14', '15h 55m', '7,488 nm', 'complete')`,
    [userId]
  );

  console.log('Database seeded. Demo login: pilot@example.com / pilotdemo123');
}

run()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
