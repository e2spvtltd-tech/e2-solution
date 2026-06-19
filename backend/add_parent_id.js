require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const connection = await pool.getConnection();
    console.log('Adding parent_id column to users table...');
    
    // Check if column already exists
    const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'parent_id'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE users ADD COLUMN parent_id VARCHAR(50) NULL");
      console.log('Column parent_id added successfully.');
      
      // Backfill parent_id for existing users who are placed
      await connection.query("UPDATE users SET parent_id = sponsor_id WHERE placement != 'Pending'");
      console.log('Existing placed users updated with parent_id = sponsor_id.');
    } else {
      console.log('Column parent_id already exists.');
    }
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
run();
