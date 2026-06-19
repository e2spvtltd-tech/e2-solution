require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    const connection = await pool.getConnection();
    
    // Update volume for existing users
    await connection.query("UPDATE users SET volume = volume + 100000 WHERE role = 'USER'");
    
    // Add transaction for existing users
    const [users] = await connection.query("SELECT id FROM users WHERE role = 'USER'");
    for (const user of users) {
      await connection.query(
        "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Initial Investment', 'System Update', 100000.00, 'deposit', 'COMPLETED', NOW())",
        [user.id]
      );
    }
    
    console.log('Added 100,000 as invested amount (volume + transaction) to existing users.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
run();
