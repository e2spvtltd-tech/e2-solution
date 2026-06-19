require('dotenv').config();
const { pool } = require('./config/db');

async function run() {
  try {
    console.log('Starting retroactive ROI calculation (Timezone Corrected)...');
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const [users] = await connection.query("SELECT id, volume, created_at FROM users WHERE role = 'USER'");

      for (const user of users) {
        console.log(`Processing User ID: ${user.id}...`);

        const [existingRoi] = await connection.query("SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'roi'", [user.id]);
        const roiToDeduct = existingRoi[0].total || 0;
        
        if (roiToDeduct > 0) {
          await connection.query("UPDATE users SET income_wallet = income_wallet - ? WHERE id = ?", [roiToDeduct, user.id]);
          await connection.query("DELETE FROM transactions WHERE user_id = ? AND type = 'roi'", [user.id]);
        }

        let currentDate = new Date(user.created_at);
        currentDate.setHours(0,0,0,0);
        
        const today = new Date();
        today.setHours(0,0,0,0);

        let totalNewRoi = 0;
        let daysCount = 0;

        while (currentDate <= today && daysCount < 100) {
          const dayOfWeek = currentDate.getDay(); 
          
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const roiAmount = user.volume * 0.02;
            totalNewRoi += roiAmount;

            // Correctly format local date to match MySQL local time
            const localDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} 12:00:00`;
            
            await connection.query(
              "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Daily ROI', '2% Plan Yield', ?, 'roi', 'COMPLETED', ?)",
              [user.id, roiAmount, localDateStr]
            );
          }
          
          currentDate.setDate(currentDate.getDate() + 1);
          daysCount++;
        }

        if (totalNewRoi > 0) {
          await connection.query("UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?", [totalNewRoi, user.id]);
          console.log(`Added ${totalNewRoi} total new ROI for user ${user.id}.`);
        }
      }

      await connection.commit();
      console.log('Retroactive ROI calculation completed successfully!');
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
