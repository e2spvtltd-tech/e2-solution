const cron = require('node-cron');
const { pool } = require('../config/db');

// Schedule: '59 23 * * *' runs at 23:59 (11:59 PM) every day
cron.schedule('59 23 * * *', async () => {
  console.log('Running Daily Referral Cutoff Cron Job...');
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Find all PENDING referral transactions created today or earlier
      const [transactions] = await connection.query(
        "SELECT id, user_id, amount FROM transactions WHERE type = 'referral' AND status = 'PENDING'"
      );

      if (transactions.length > 0) {
        // Group by user_id to optimize wallet updates
        const userUpdates = {};
        const transactionIds = [];

        transactions.forEach(tx => {
          if (!userUpdates[tx.user_id]) {
            userUpdates[tx.user_id] = 0;
          }
          userUpdates[tx.user_id] += parseFloat(tx.amount);
          transactionIds.push(tx.id);
        });

        // Update each sponsor's income_wallet
        for (const [userId, amount] of Object.entries(userUpdates)) {
          await connection.query(
            "UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?",
            [amount, userId]
          );
        }

        // Mark all these transactions as COMPLETED
        await connection.query(
          "UPDATE transactions SET status = 'COMPLETED' WHERE id IN (?)",
          [transactionIds]
        );

        await connection.commit();
        console.log(`Daily Referral Cutoff processed successfully. ${transactions.length} referrals processed for ${Object.keys(userUpdates).length} users.`);
      } else {
        await connection.commit();
        console.log('No pending referrals found for cutoff.');
      }
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error executing Daily Referral Cutoff Cron Job:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

console.log('Daily Referral Cutoff Cron Job initialized.');
