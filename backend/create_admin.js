require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./config/db');

async function createAdmin() {
  const connection = await pool.getConnection();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await connection.query("INSERT IGNORE INTO users (full_name, mobile, email, password, user_id, role, status) VALUES ('Admin', '0000000000', 'admin@example.com', ?, 'ADMIN-001', 'ADMIN', 'ACTIVE')", [hash]);
    console.log('Admin user created: admin@example.com / admin123');
  } catch (err) {
    console.error(err);
  } finally {
    connection.release();
    process.exit();
  }
}
createAdmin();
