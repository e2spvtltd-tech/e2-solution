const { pool } = require('../config/db');
const { calculateAndPayBinaryBonus } = require('../utils/binary');

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
          
          // Note: Income wallet update is deferred until the daily cron cutoff at 11:59 PM.
          
          // Record the referral transaction for the sponsor as PENDING
          await conn.query(
            "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Direct Referral Bonus', ?, ?, 'referral', 'PENDING', NOW())",
            [sponsor.id, `5% from ${user.full_name} (${user.user_id})`, bonus]
          );

          // Notify Sponsor
          await conn.query(
            "INSERT INTO notifications (message, type) VALUES (?, 'general')",
            [`You have a pending 5% referral bonus (₹${bonus}) from ${user.full_name}'s investment. It will be credited at the daily cutoff.`]
          );
        }
      }

      await conn.commit();
      conn.release();

      // Note: Binary Matching Bonus evaluation for the upline is deferred to the daily cron cutoff

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

const renewPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      const [users] = await conn.query('SELECT volume, main_wallet FROM users WHERE id = ?', [userId]);
      if (users.length === 0) throw new Error('User not found');
      const user = users[0];

      const renewalCost = parseFloat(user.volume || 100000);

      if (parseFloat(user.main_wallet) < renewalCost) {
        throw new Error(`Insufficient main wallet balance. Renewal costs ₹${renewalCost}`);
      }

      // Deduct from main_wallet and extend plan_expiry_date
      await conn.query(
        "UPDATE users SET main_wallet = main_wallet - ?, plan_expiry_date = DATE_ADD(CURDATE(), INTERVAL 100 DAY) WHERE id = ?",
        [renewalCost, userId]
      );

      // Record renewal transaction
      await conn.query(
        "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Plan Renewal', '100-Day Extension', ?, 'deposit', 'COMPLETED', NOW())",
        [userId, renewalCost]
      );

      await conn.commit();
      conn.release();

      res.json({ message: 'Plan successfully renewed for 100 days!' });
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createInvestment, renewPlan };
