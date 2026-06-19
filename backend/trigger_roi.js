require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    console.log('Triggering Daily ROI for existing eligible users for today...');
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Find users whose plan is valid and status is ACTIVE
      const [users] = await connection.query(
        "SELECT id, volume FROM users WHERE role = 'USER' AND status = 'ACTIVE' AND plan_expiry_date >= CURDATE() AND volume > 0"
      );

      let processedCount = 0;
      for (const user of users) {
        // Calculate 2% of invested amount
        const roiAmount = user.volume * 0.02;

        // Add to income_wallet
        await connection.query(
          "UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?",
          [roiAmount, user.id]
        );

        // Add transaction
        await connection.query(
          "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Daily ROI', '2% Plan Yield', ?, 'roi', 'COMPLETED', NOW())",
          [user.id, roiAmount]
        );
        processedCount++;
      }
      
      await connection.commit();
      console.log(`Successfully credited 2% ROI to ${processedCount} existing users!`);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error triggering ROI:', error);
    process.exit(1);
  }
}

run();
