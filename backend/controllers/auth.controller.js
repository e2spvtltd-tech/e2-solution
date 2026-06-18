const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { fullName, mobile, email, password, sponsorId, placement } = req.body;
  const targetSponsorId = sponsorId || 'BRIMLM-100000';

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique user_id
    const userIdStr = 'BRIMLM-' + Math.floor(100000 + Math.random() * 900000);

    const [result] = await pool.query(
      'INSERT INTO users (full_name, mobile, email, password, plain_password, sponsor_id, placement, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, mobile, email, hashedPassword, password, targetSponsorId, placement || 'Pending', userIdStr]
    );

    const newUserId = result.insertId;

    // Notify Sponsor
    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'registration', ?)",
      [`New user registered: ${fullName} (${userIdStr}) under your referral.`, targetSponsorId]
    );

    // Notify Admin
    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'registration', 'BRIMLM-100000')",
      [`New user registered: ${fullName} (${userIdStr}) under sponsor ${targetSponsorId}.`]
    );

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
