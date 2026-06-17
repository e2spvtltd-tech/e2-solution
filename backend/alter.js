require('dotenv').config();
const { pool } = require('./config/db');

async function alterTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query("ALTER TABLE users MODIFY COLUMN placement ENUM('Left Side', 'Right Side', 'Pending') DEFAULT 'Pending'");
    console.log("Table altered successfully!");
    connection.release();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

alterTable();
