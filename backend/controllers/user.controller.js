const { pool } = require('../config/db');

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[0];

    const [
      [team],
      [earnings],
      [binary],
      [investments],
      [roi],
      [transactions]
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users WHERE sponsor_id = ?', [user.user_id]),
      pool.query("SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type IN ('roi', 'binary', 'referral') AND status = 'COMPLETED'", [userId]),
      pool.query("SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'binary' AND status = 'COMPLETED'", [userId]),
      pool.query("SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'deposit' AND status = 'COMPLETED'", [userId]),
      pool.query("SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'roi' AND status = 'COMPLETED' AND DATE(created_at) = CURDATE()", [userId]),
      pool.query('SELECT id, title, amount, type as kind, created_at as time FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5', [userId])
    ]);

    res.json({
      totalEarnings: earnings[0].total || 0,
      walletBalance: user.main_wallet || 0,
      binaryIncome: binary[0].total || 0,
      totalInvestment: investments[0].total || 0,
      todayEarning: roi[0].total || 0,
      teamMembers: team[0].count || 0,
      recentActivity: transactions.map(t => ({
        id: t.id.toString(),
        title: t.title,
        amount: parseFloat(t.amount),
        kind: t.kind,
        time: t.time
      })),
      wallets: {
        main: user.main_wallet || 0,
        income: user.income_wallet || 0,
        bonus: 0,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await pool.query('SELECT full_name, user_id, email, role, status, plain_password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const requestWithdrawal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, wallet } = req.body; // wallet: 'main', 'income', 'bonus'

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = users[0];
    
    let walletColumn = 'main_wallet';
    if (wallet === 'income') walletColumn = 'income_wallet';
    if (wallet === 'bonus') walletColumn = 'bonus_wallet';

    if (parseFloat(user[walletColumn]) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Deduct amount
    await pool.query(
      `UPDATE users SET ${walletColumn} = ${walletColumn} - ? WHERE id = ?`,
      [amount, userId]
    );

    // Record transaction
    await pool.query(
      'INSERT INTO transactions (user_id, title, subtitle, amount, type, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, 'Withdrawal Request', 'Wallet Transfer', -Math.abs(amount), 'withdrawal', 'PENDING']
    );

    res.json({ message: 'Withdrawal request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReferrals = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await pool.query('SELECT user_id FROM users WHERE id = ?', [userId]);
    const userStrId = users[0].user_id;

    const [referrals] = await pool.query('SELECT id, full_name, user_id, status, created_at, volume FROM users WHERE sponsor_id = ? ORDER BY created_at DESC', [userStrId]);
    res.json(referrals.map(r => ({
      id: r.user_id,
      name: r.full_name,
      joined: new Date(r.created_at).toLocaleDateString(),
      volume: parseFloat(r.volume),
      status: r.status,
      team: 0 // Mocking team size for now
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const buildTree = async (user_id, currentDepth, maxDepth) => {
  if (!user_id || currentDepth > maxDepth) return null;

  const [users] = await pool.query('SELECT full_name, user_id, status, volume FROM users WHERE user_id = ?', [user_id]);
  if (users.length === 0) return null;

  const user = users[0];
  const node = {
    id: user.user_id,
    name: user.full_name,
    status: user.status === 'ACTIVE' ? 'active' : 'inactive',
    volume: parseFloat(user.volume || 0),
    left: null,
    right: null
  };

  if (currentDepth < maxDepth) {
    const sponsorIds = [user_id];
    if (user_id === 'BRIMLM-100000') {
      sponsorIds.push('BMLM-1000');
    }
    const [children] = await pool.query('SELECT user_id, placement FROM users WHERE sponsor_id IN (?)', [sponsorIds]);
    const leftChild = children.find(c => c.placement === 'Left Side');
    const rightChild = children.find(c => c.placement === 'Right Side');

    if (leftChild) node.left = await buildTree(leftChild.user_id, currentDepth + 1, maxDepth);
    if (rightChild) node.right = await buildTree(rightChild.user_id, currentDepth + 1, maxDepth);
  }

  return node;
};

const getNetwork = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await pool.query('SELECT user_id FROM users WHERE id = ?', [userId]);
    const userStrId = users[0].user_id;

    const tree = await buildTree(userStrId, 0, 3); // 3 levels deep max
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      'UPDATE users SET password = ?, plain_password = ? WHERE id = ?',
      [hashedPassword, newPassword, userId]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getProfile, requestWithdrawal, getReferrals, getNetwork, changePassword };
