require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const connection = await pool.getConnection();
    await connection.query("UPDATE users SET main_wallet = main_wallet + 100000 WHERE role = 'USER'");
    console.log('Added 100,000 to existing users main_wallet.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
run();
