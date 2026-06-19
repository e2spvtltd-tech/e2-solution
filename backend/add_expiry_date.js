require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const connection = await pool.getConnection();
    console.log('Adding plan_expiry_date column to users table...');
    
    // Check if column already exists
    const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'plan_expiry_date'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE users ADD COLUMN plan_expiry_date DATE NULL");
      console.log('Column plan_expiry_date added successfully.');
      
      // Backfill plan_expiry_date for existing users (100 days from created_at or today)
      await connection.query("UPDATE users SET plan_expiry_date = DATE_ADD(DATE(created_at), INTERVAL 100 DAY)");
      console.log('Existing users updated with plan_expiry_date.');
    } else {
      console.log('Column plan_expiry_date already exists.');
    }
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
run();
