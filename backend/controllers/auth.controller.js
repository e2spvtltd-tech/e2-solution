const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { calculateAndPayBinaryBonus } = require('../utils/binary');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { fullName, mobile, email, password, sponsorId, placement, parentId, investingAmount } = req.body;
  const targetSponsorId = sponsorId || 'E2S-1000';

  try {
    const initialAmount = parseFloat(investingAmount);
    if (isNaN(initialAmount) || initialAmount <= 0) {
      return res.status(400).json({ message: 'Investing Amount is required and must be greater than 0' });
    }

    // If placing directly, verify target parent slot is not occupied
    if (parentId && placement && placement !== 'Pending') {
      const [occupied] = await pool.query('SELECT id FROM users WHERE parent_id = ? AND placement = ?', [parentId, placement]);
      if (occupied.length > 0) {
        return res.status(400).json({ message: `The ${placement} under user ${parentId} is already occupied` });
      }
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique user_id based on last 4 digits of mobile
    let last4 = mobile && mobile.length >= 4 ? mobile.slice(-4) : Math.floor(1000 + Math.random() * 9000).toString();
    let userIdStr = 'E2S-' + last4;
    let isUnique = false;
    let attempt = 0;
    while (!isUnique && attempt < 20) {
      const [check] = await pool.query('SELECT id FROM users WHERE user_id = ?', [userIdStr]);
      if (check.length === 0) {
        isUnique = true;
      } else {
        attempt++;
        userIdStr = 'E2S-' + last4 + String.fromCharCode(64 + attempt); // Appends A, B, C...
      }
    }

    const [result] = await pool.query(
      'INSERT INTO users (full_name, mobile, email, password, plain_password, sponsor_id, placement, user_id, main_wallet, volume, plan_expiry_date, parent_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 100 DAY), ?)',
      [fullName, mobile, email, hashedPassword, password, targetSponsorId, placement || 'Pending', userIdStr, initialAmount, initialAmount, parentId || null]
    );

    const newUserId = result.insertId;

    // Add initial investment transaction
    await pool.query(
      "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Initial Investment', 'Sign-up Bonus', ?, 'deposit', 'COMPLETED', NOW())",
      [newUserId, initialAmount]
    );

    // Calculate 5% Referral Bonus for Initial Investment
    const bonus = initialAmount * 0.05;
    
    // Find sponsor
    const [sponsors] = await pool.query('SELECT id, role, email FROM users WHERE user_id = ?', [targetSponsorId]);
    if (sponsors.length > 0) {
      const sponsor = sponsors[0];
      // Credit Sponsor's income wallet
      await pool.query("UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?", [bonus, sponsor.id]);
      
      // Record the referral transaction for the sponsor (proof)
      await pool.query(
        "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Direct Referral Bonus', ?, ?, 'referral', 'COMPLETED', NOW())",
        [sponsor.id, `5% from new user ${fullName} (${userIdStr})`, bonus]
      );
      
      // Notify Sponsor
      await pool.query(
        "INSERT INTO notifications (message, type, user_id) VALUES (?, 'general', ?)",
        [`You received a 5% referral bonus (₹${bonus}) from new user ${fullName}'s initial investment.`, targetSponsorId]
      );
    }

    // Notify Sponsor (Registration event)
    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'registration', ?)",
      [`New user registered: ${fullName} (${userIdStr}) under your referral.`, targetSponsorId]
    );

    // Notify Admin
    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'registration', 'E2S-1000')",
      [`New user registered: ${fullName} (${userIdStr}) under sponsor ${targetSponsorId}.`]
    );

    // If placed directly, trigger Binary Matching Bonus evaluation for the upline
    if (parentId && placement && placement !== 'Pending') {
      try {
        await calculateAndPayBinaryBonus(userIdStr);
      } catch (err) {
        console.error('Failed to calculate binary bonus:', err);
      }
    }

    res.status(201).json({
      id: newUserId,
      userId: userIdStr,
      fullName,
      email,
      role: 'USER',
      token: generateToken(newUserId, 'USER'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { emailOrId, password } = req.body;

  try {
    // Hardcoded Permanent Admin Login
    if (emailOrId === 'admin@e2solution.com' && password === 'e2solution@123') {
      return res.json({
        id: 0,
        userId: 'ADMIN-001',
        fullName: 'Administrator',
        email: 'admin@e2solution.com',
        role: 'ADMIN',
        token: generateToken(0, 'ADMIN'),
      });
    }

    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR user_id = ?',
      [emailOrId, emailOrId]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Force all database-registered users to act as standard users
    res.json({
      id: user.id,
      userId: user.user_id,
      fullName: user.full_name,
      email: user.email,
      role: 'USER',
      token: generateToken(user.id, 'USER'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
