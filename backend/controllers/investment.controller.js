const { pool } = require('../config/db');

const createInvestment = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      // 1. Get User Info
      const [users] = await conn.query('SELECT user_id, sponsor_id, full_name FROM users WHERE id = ?', [userId]);
      if (users.length === 0) throw new Error('User not found');
      const user = users[0];

      // 2. Insert the investment record
      await conn.query(
        "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Investment Package', 'Standard Plan', ?, 'deposit', 'COMPLETED', NOW())",
        [userId, amount]
      );

      // 3. Update User Volume
      await conn.query("UPDATE users SET volume = volume + ? WHERE id = ?", [amount, userId]);

      // 4. Calculate 5% Referral Bonus
      if (user.sponsor_id) {
        const bonus = parseFloat(amount) * 0.05;
        
        // Find sponsor
        const [sponsors] = await conn.query('SELECT id, role, email FROM users WHERE user_id = ?', [user.sponsor_id]);
        
        if (sponsors.length > 0) {
          const sponsor = sponsors[0];
          
          // Credit Sponsor's income wallet
          await conn.query("UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?", [bonus, sponsor.id]);
          
          // Record the referral transaction for the sponsor
          await conn.query(
            "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Direct Referral Bonus', ?, ?, 'referral', 'COMPLETED', NOW())",
            [sponsor.id, `From ${user.full_name}`, bonus]
          );

          // Notify Sponsor
          await conn.query(
            "INSERT INTO notifications (message, type) VALUES (?, 'general')",
            [`You received a 5% referral bonus ($${bonus}) from ${user.full_name}'s investment.`]
          );
        }
      }

      await conn.commit();
      conn.release();

      res.status(201).json({ message: 'Investment created successfully. Referral bonuses distributed if applicable.' });
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInvestment };
