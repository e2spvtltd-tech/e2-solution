const { pool } = require('../config/db');
const { calculateAndPayBinaryBonus } = require('../utils/binary');

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role === 'ADMIN') {
      return res.json({
        totalEarnings: 0,
        walletBalance: 0,
        binaryIncome: 0,
        totalInvestment: 0,
        todayEarning: 0,
        teamMembers: 0,
        recentActivity: [],
        wallets: { main: 0, income: 0, bonus: 0 }
      });
    }

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
      totalEarnings: parseFloat(earnings[0].total || 0),
      walletBalance: parseFloat(user.main_wallet || 0),
      binaryIncome: parseFloat(binary[0].total || 0),
      totalInvestment: parseFloat(investments[0].total || 0),
      todayEarning: parseFloat(roi[0].total || 0),
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
    
    if (req.user.role === 'ADMIN') {
       return res.json({ full_name: 'Administrator', user_id: 'ADMIN-001', email: 'admin@e2solution.com', role: 'ADMIN', status: 'ACTIVE' });
    }

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

    if (req.user.role === 'ADMIN') {
      return res.status(400).json({ message: 'Admin cannot request withdrawal' });
    }

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
    if (req.user.role === 'ADMIN') return res.json([]);
    
    const [users] = await pool.query('SELECT user_id FROM users WHERE id = ?', [userId]);
    const userStrId = users[0].user_id;

    const [referrals] = await pool.query('SELECT id, full_name, user_id, status, created_at, volume, placement FROM users WHERE sponsor_id = ? ORDER BY created_at DESC', [userStrId]);
    res.json(referrals.map(r => ({
      id: r.user_id,
      name: r.full_name,
      joined: new Date(r.created_at).toLocaleDateString(),
      volume: parseFloat(r.volume),
      status: r.status,
      placement: r.placement,
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
    const parentIds = [user_id];
    if (user_id === 'E2S-1000') {
      parentIds.push('E2S-1000');
      parentIds.push('E2S-100000');
    }
    const [children] = await pool.query('SELECT user_id, placement FROM users WHERE parent_id IN (?)', [parentIds]);
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
    if (req.user.role === 'ADMIN') return res.json(null);
    
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

    if (req.user.role === 'ADMIN') {
      return res.status(400).json({ message: 'Cannot change admin password here' });
    }

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

const getNotifications = async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') return res.json([]);
    
    const [users] = await pool.query('SELECT user_id FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    const userStrId = users[0].user_id;

    const [notifications] = await pool.query(
      "SELECT * FROM notifications WHERE user_id = ? AND is_read = 0 ORDER BY created_at DESC LIMIT 50",
      [userStrId]
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') return res.json({ message: 'Notifications marked as read' });
    
    const [users] = await pool.query('SELECT user_id FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    const userStrId = users[0].user_id;

    await pool.query("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0", [userStrId]);
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlacement = async (req, res) => {
  const { id } = req.params;
  const { placement, parentId } = req.body;

  try {
    // 1. Get the user being placed
    const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User to place not found' });
    }
    const userToPlace = users[0];

    if (userToPlace.placement !== 'Pending') {
      return res.status(400).json({ message: 'User is already placed' });
    }

    // Get current logged-in user's user_id
    const [operators] = await pool.query('SELECT user_id FROM users WHERE id = ?', [req.user.id]);
    if (operators.length === 0) {
      return res.status(404).json({ message: 'Operator user not found' });
    }
    const operatorUserId = operators[0].user_id;

    // Verify operator is the original sponsor of the user being placed
    if (userToPlace.sponsor_id !== operatorUserId) {
      return res.status(403).json({ message: 'Not authorized to place this user' });
    }

    const finalParentId = parentId || operatorUserId;

    // 2. Verify target parent exists
    const [parents] = await pool.query('SELECT * FROM users WHERE user_id = ?', [finalParentId]);
    if (parents.length === 0) {
      return res.status(404).json({ message: 'Target parent user not found' });
    }
    const parent = parents[0];

    // Verify target parent is yourself or in your downline
    if (finalParentId !== operatorUserId) {
      let ancestorCheck = finalParentId;
      let isDescendant = false;
      for (let depth = 0; depth < 50; depth++) {
        const [parentCheck] = await pool.query('SELECT parent_id, sponsor_id FROM users WHERE user_id = ?', [ancestorCheck]);
        if (parentCheck.length === 0 || !parentCheck[0].parent_id) break;
        if (parentCheck[0].parent_id === operatorUserId) {
          isDescendant = true;
          break;
        }
        ancestorCheck = parentCheck[0].parent_id;
      }
      if (!isDescendant) {
        return res.status(400).json({ message: 'Target parent must be yourself or in your downline' });
      }
    }

    // 3. Verify target placement is unoccupied
    const [occupied] = await pool.query('SELECT id FROM users WHERE parent_id = ? AND placement = ?', [finalParentId, placement]);
    if (occupied.length > 0) {
      return res.status(400).json({ message: `The ${placement} under user ${finalParentId} is already occupied` });
    }

    // 4. Update the placement and parent ID
    await pool.query(
      'UPDATE users SET placement = ?, parent_id = ? WHERE user_id = ?',
      [placement, finalParentId, id]
    );

    // 5. Send notifications
    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'general', ?)",
      [`User ${userToPlace.full_name} (${id}) has been placed on the ${placement} of ${parent.full_name} (${finalParentId}).`, finalParentId]
    );

    await pool.query(
      "INSERT INTO notifications (message, type, user_id) VALUES (?, 'general', 'E2S-1000')",
      [`User ${userToPlace.full_name} (${id}) has been placed on the ${placement} of ${parent.full_name} (${finalParentId}).`]
    );

    // Trigger Binary Matching Bonus evaluation for the upline
    calculateAndPayBinaryBonus(id);

    res.json({ message: 'User placed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getProfile, requestWithdrawal, getReferrals, getNetwork, changePassword, getNotifications, markNotificationsRead, updatePlacement };
