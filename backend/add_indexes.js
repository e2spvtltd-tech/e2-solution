require('dotenv').config();
const { pool } = require('./config/db');

async function addIndexes() {
  try {
    const connection = await pool.getConnection();

    console.log('Adding index to users.sponsor_id...');
    try {
      await connection.query('CREATE INDEX idx_users_sponsor_id ON users(sponsor_id)');
    } catch (e) { console.log('Index might already exist or error:', e.message); }

    console.log('Adding index to users.parent_id...');
    try {
      await connection.query('CREATE INDEX idx_users_parent_id ON users(parent_id)');
    } catch (e) { console.log('Index might already exist or error:', e.message); }

    console.log('Adding compound index to transactions (user_id, type, status)...');
    try {
      await connection.query('CREATE INDEX idx_transactions_user_type_status ON transactions(user_id, type, status)');
    } catch (e) { console.log('Index might already exist or error:', e.message); }

    console.log('Adding index to notifications.user_id...');
    try {
      await connection.query('CREATE INDEX idx_notifications_user_id ON notifications(user_id)');
    } catch (e) { console.log('Index might already exist or error:', e.message); }

    console.log('Indexes added successfully.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error adding indexes:', error);
    process.exit(1);
  }
}

addIndexes();
