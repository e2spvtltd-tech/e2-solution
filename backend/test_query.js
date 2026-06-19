require('dotenv').config();
const { pool } = require('./config/db');

async function test() {
  try {
    const [reports] = await pool.query(`
      SELECT 
        u.user_id as idNo, 
        u.full_name as name, 
        u.mobile, 
        u.volume as investment,
        COALESCE(SUM(CASE WHEN t.type = 'binary' AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as binaryIncome,
        COALESCE(SUM(CASE WHEN t.type = 'referral' AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as drIncome,
        COALESCE(SUM(CASE WHEN t.type IN ('roi', 'binary', 'referral') AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as totalIncome,
        COALESCE(SUM(CASE WHEN t.type = 'withdrawal' AND t.status = 'COMPLETED' THEN ABS(t.amount) ELSE 0 END), 0) as payout
      FROM users u
      LEFT JOIN transactions t ON u.id = t.user_id
      WHERE u.role = 'USER'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    console.log('Query success:', reports.length, 'records found.');
    console.log(reports);
  } catch (err) {
    console.error('Query error:', err);
  }
  process.exit(0);
}
test();
