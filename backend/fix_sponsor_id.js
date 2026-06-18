require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const [result] = await pool.query(
      "UPDATE users SET sponsor_id = 'BRIMLM-100000' WHERE sponsor_id = 'BMLM-1000'"
    );
    console.log(`Successfully updated sponsor_id for ${result.affectedRows} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
run();
