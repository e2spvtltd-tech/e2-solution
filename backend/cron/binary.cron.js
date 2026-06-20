const cron = require('node-cron');
const { pool } = require('../config/db');
const { getLegVolume } = require('../utils/binary');

// Schedule: '59 23 * * *' runs at 23:59 (11:59 PM) every day
cron.schedule('59 23 * * *', async () => {
  console.log('Running Daily Binary Matching Cutoff Cron Job...');
  try {
    const connection = await pool.getConnection();

    try {
      // Find all active users
      const [users] = await connection.query(
        "SELECT id, user_id, full_name FROM users WHERE role = 'USER' AND status = 'ACTIVE'"
      );

      let processedCount = 0;
      let payoutsCount = 0;

      for (const user of users) {
        // 1 & 2. Get Volume of Left and Right legs
        const leftVolume = await getLegVolume(connection, user.user_id, 'Left Side');
        const rightVolume = await getLegVolume(connection, user.user_id, 'Right Side');

        // 3. Find matched volume (least count)
        const matchedVolume = Math.min(leftVolume, rightVolume);

        if (matchedVolume > 0) {
          // 4. Calculate total deserved binary bonus (5% of matched)
          const totalDeserved = matchedVolume * 0.05;

          // 5. Find how much binary bonus was already paid to this user
          const [paidRows] = await connection.query("SELECT SUM(amount) as totalPaid FROM transactions WHERE user_id = ? AND type = 'binary'", [user.id]);
          const alreadyPaid = parseFloat(paidRows[0].totalPaid || 0);

          // 6. Calculate difference
          const newBonus = totalDeserved - alreadyPaid;

          if (newBonus > 0) {
            // We use a local transaction for each user's payout to ensure isolation
            await connection.beginTransaction();
            try {
              // Pay the difference
              await connection.query("UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?", [newBonus, user.id]);
              
              // Insert Proof Transaction
              await connection.query(
                "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Binary Matching Bonus', ?, ?, 'binary', 'COMPLETED', NOW())",
                [user.id, `5% match from Left(₹${leftVolume}) and Right(₹${rightVolume})`, newBonus]
              );

              // Notify
              await connection.query(
                "INSERT INTO notifications (message, type, user_id) VALUES (?, 'general', ?)",
                [`You received a ₹${newBonus} Binary Matching Bonus from new network volume at the daily cutoff!`, user.user_id]
              );
              
              await connection.commit();
              payoutsCount++;
            } catch (err) {
              await connection.rollback();
              console.error(`Error processing binary bonus for user ${user.user_id}:`, err);
            }
          }
        }
        processedCount++;
      }
      
      console.log(`Daily Binary Matching Cutoff completed. Processed ${processedCount} users. Issued ${payoutsCount} new payouts.`);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error executing Daily Binary Matching Cutoff Cron Job:', error);
  }
});

console.log('Daily Binary Matching Cutoff Cron Job initialized.');
