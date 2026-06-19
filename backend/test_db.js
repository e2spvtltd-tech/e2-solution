require('dotenv').config();
const { pool } = require('./config/db');

async function test() {
  const [earnings] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type IN ('roi', 'binary', 'referral') AND status = 'COMPLETED'");
  console.log('Total Earnings across all users:', earnings[0].total);

  const [roi] = await pool.query("SELECT * FROM transactions WHERE type = 'roi'");
  console.log('All ROI transactions:', roi);

  const [users] = await pool.query("SELECT id, income_wallet FROM users");
  console.log('Users:', users);
  
  process.exit(0);
}
test();
