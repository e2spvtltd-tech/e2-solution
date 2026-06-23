require('dotenv').config();
const { pool } = require('./config/db');

async function alterTable() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Adding bank detail columns to users table...');
    
    // Using IF NOT EXISTS or checking if columns exist would be better, but simple ALTER will do for now.
    // If running multiple times, it might fail if columns already exist.
    
    const alterQuery = `
      ALTER TABLE users 
      ADD COLUMN bank_name VARCHAR(150) NULL,
      ADD COLUMN account_number VARCHAR(50) NULL,
      ADD COLUMN account_holder_name VARCHAR(150) NULL,
      ADD COLUMN ifsc_code VARCHAR(50) NULL,
      ADD COLUMN bank_branch_address VARCHAR(255) NULL
    `;
    
    await connection.query(alterQuery);
    
    console.log("Table altered successfully!");
    connection.release();
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist. Skipping.');
      process.exit(0);
    } else {
      console.error(err);
      process.exit(1);
    }
  }
}

alterTable();
