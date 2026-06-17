require('dotenv').config();
const { pool } = require('./config/db');

async function test() {
  try {
    const [chartData] = await pool.query(`
      SELECT 
        ANY_VALUE(DATE_FORMAT(created_at, '%a')) as name,
        SUM(CASE WHEN type='deposit' THEN amount ELSE 0 END) as pv,
        SUM(CASE WHEN type IN ('roi', 'binary', 'referral') THEN amount ELSE 0 END) as uv
      FROM transactions 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);
    console.log('SUCCESS');
  } catch (e) {
    console.error('ERROR:', e.message);
  }
  process.exit();
}
test();
