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
      [fullName, mobile, email, hashedPassword, password, sponsorId || null, placement || 'Pending', userIdStr]
    );

    const newUserId = result.insertId;

    // Notify Admin
    await pool.query(
      "INSERT INTO notifications (message, type) VALUES (?, 'registration')",
      [`New user registered: ${fullName} (${userIdStr})`]
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

    res.json({
      id: user.id,
      userId: user.user_id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
