require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const connection = await pool.getConnection();
    console.log('Adding user_id column to notifications table...');
    
    // Check if column already exists
    const [columns] = await connection.query("SHOW COLUMNS FROM notifications LIKE 'user_id'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE notifications ADD COLUMN user_id VARCHAR(50) NULL");
      console.log('Column user_id added successfully.');
    } else {
      console.log('Column user_id already exists.');
    }
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
run();
