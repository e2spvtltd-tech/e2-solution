const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      
      // Hardcoded Admin Bypass
      if (decoded.role === 'ADMIN' && decoded.id === 0) {
        req.user = decoded;
        return next();
      }

      // Check Database to ensure user still exists and is not deleted/blocked
      const { pool } = require('../config/db');
      const [users] = await pool.query('SELECT id, status FROM users WHERE id = ?', [decoded.id]);
      
      if (users.length === 0) {
        return res.status(401).json({ message: 'User account no longer exists' });
      }
      
      if (users[0].status === 'INACTIVE') {
        return res.status(403).json({ message: 'User account has been blocked by an administrator' });
      }

      req.user = decoded; // { id, role }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
