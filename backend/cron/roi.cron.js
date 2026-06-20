const cron = require('node-cron');
const { pool } = require('../config/db');

// Schedule: '59 23 * * *' runs at 23:59 (11:59 PM) every day
// For testing purposes, we use standard cron format.
cron.schedule('59 23 * * *', async () => {
  console.log('Running Daily ROI Cron Job...');
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Find users whose plan is valid and status is ACTIVE
      const [users] = await connection.query(
        "SELECT id, volume FROM users WHERE role = 'USER' AND status = 'ACTIVE' AND plan_expiry_date >= CURDATE() AND volume > 0"
      );

      for (const user of users) {
        // 2% of invested amount
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
      }
      
      await connection.commit();
      console.log(`Daily ROI processed successfully for ${users.length} users.`);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error executing Daily ROI Cron Job:', error);
  }
});

console.log('Daily ROI Cron Job initialized.');
