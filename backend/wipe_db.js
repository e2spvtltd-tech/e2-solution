require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./config/db');

async function reset() {
  try {
    const conn = await pool.getConnection();
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('TRUNCATE TABLE transactions');
    await conn.query('TRUNCATE TABLE notifications');
    await conn.query('TRUNCATE TABLE users');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await conn.query(`
      INSERT INTO users (full_name, mobile, email, password, user_id, role, status, volume, main_wallet, income_wallet, created_at)
      VALUES ('System Admin', '9999999999', 'admin@ec2.com', ?, 'ADMIN', 'ADMIN', 'ACTIVE', 0, 0, 0, NOW())
    `, [password]);

    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    conn.release();

    console.log('Database wiped! Only Admin remains.');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

reset();
