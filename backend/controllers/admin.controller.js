const { pool } = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const [usersResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'USER'");
    const [activeUsersResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'USER' AND status = 'ACTIVE'");
    const [pendingTxResult] = await pool.query("SELECT COUNT(*) as count FROM transactions WHERE status = 'PENDING'");
    
    // Sum of all deposits
    const [revenueResult] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type = 'deposit' AND status = 'COMPLETED'");
    
    // Sum of all withdrawals
    const [withdrawalsResult] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type = 'withdrawal' AND status = 'PENDING'");
    
    // Sum of all incomes (ROI, Binary, Referral)
    const [roiResult] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type = 'roi' AND status = 'COMPLETED' AND DATE(created_at) = CURDATE()");
    const [binaryResult] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type = 'binary' AND status = 'COMPLETED' AND DATE(created_at) = CURDATE()");
    const [refResult] = await pool.query("SELECT SUM(amount) as total FROM transactions WHERE type = 'referral' AND status = 'COMPLETED' AND DATE(created_at) = CURDATE()");
    
    const [recentActivity] = await pool.query(
      "SELECT t.id, t.title, t.subtitle as time, t.amount, u.full_name as user_name FROM transactions t LEFT JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC LIMIT 5"
    );

    // Chart Data Generation (Last 7 Days Deposits vs Incomes)
    const [chartData] = await pool.query(`
      SELECT 
        ANY_VALUE(DATE_FORMAT(created_at, '%a')) as name,
        SUM(CASE WHEN type='deposit' THEN amount ELSE 0 END) as pv,
        SUM(CASE WHEN type IN ('roi', 'binary', 'referral') THEN amount ELSE 0 END) as uv
      FROM transactions 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);

    res.json({
      activeUsers: activeUsersResult[0].count,
      totalUsers: usersResult[0].count,
      totalInvestments: revenueResult[0].total || 0,
      activeInvestments: 0, // Zeroed out demo data
      pendingWithdrawals: Math.abs(withdrawalsResult[0].total || 0),
      todayJoinings: 0, // Zeroed out demo data
      todayROI: roiResult[0].total || 0,
      todayBinary: binaryResult[0].total || 0,
      todayReferral: refResult[0].total || 0,
      totalRevenue: revenueResult[0].total || 0,
      recentActivity: recentActivity.map(a => ({
        id: a.id,
        title: a.title,
        time: a.time,
        amount: a.amount,
        user: a.user_name
      })),
      chartData: chartData.length > 0 ? chartData : [
        { name: 'Mon', uv: 0, pv: 0 }, { name: 'Tue', uv: 0, pv: 0 },
        { name: 'Wed', uv: 0, pv: 0 }, { name: 'Thu', uv: 0, pv: 0 },
        { name: 'Fri', uv: 0, pv: 0 }, { name: 'Sat', uv: 0, pv: 0 },
        { name: 'Sun', uv: 0, pv: 0 }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT id, full_name, user_id, status, placement, volume, mobile, sponsor_id, created_at FROM users WHERE role = 'USER' ORDER BY created_at DESC");
    
    res.json(users.map(u => ({
      id: u.user_id,
      name: u.full_name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name)}&background=random`,
      volume: `₹${parseFloat(u.volume).toLocaleString()}`,
      placement: u.placement,
      status: u.status === 'ACTIVE' ? 'Active' : u.status,
      mobile: u.mobile,
      sponsorId: u.sponsor_id || 'ADMIN',
      joined: new Date(u.created_at).toLocaleDateString()
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    // Mocking income and wallet since those tables might not be fully fleshed out for this view
    // In a real app we'd join with transactions table
    const profile = {
      id: user.user_id,
      name: user.full_name,
      mobile: user.mobile,
      email: user.email,
      password: user.plain_password || 'Hidden/Encrypted',
      sponsorId: user.sponsor_id || 'ADMIN',
      plan: 'Premium Package', // Mock plan
      joined: new Date(user.created_at).toLocaleDateString(),
      kycStatus: user.status === 'ACTIVE' ? 'Verified' : 'Pending',
      walletBalance: user.volume ? parseFloat(user.volume) : 0,
      binaryIncome: 0,
      referralIncome: 0,
      roiIncome: 0,
      teamCount: 0
    };
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const [transactions] = await pool.query(
      "SELECT t.id, t.title, t.amount, t.status, t.type, t.created_at, u.user_id as subtitle FROM transactions t LEFT JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC"
    );

    res.json(transactions.map(t => ({
      id: t.id,
      title: t.title,
      subtitle: '@' + (t.subtitle || 'unknown'),
      amount: t.amount > 0 ? `+₹${parseFloat(t.amount).toLocaleString()}` : `-₹${Math.abs(parseFloat(t.amount)).toLocaleString()}`,
      status: t.status,
      date: new Date(t.created_at).toLocaleString(),
      type: t.type
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const [notifications] = await pool.query(
      "SELECT * FROM notifications WHERE is_read = 0 ORDER BY created_at DESC LIMIT 50"
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    await pool.query("UPDATE notifications SET is_read = 1 WHERE is_read = 0");
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const buildTree = async (user_id, currentDepth, maxDepth) => {
  if (!user_id || currentDepth > maxDepth) return null;

  const [users] = await pool.query('SELECT full_name, user_id, status FROM users WHERE user_id = ?', [user_id]);
  if (users.length === 0) return null;

  const user = users[0];
  const node = {
    id: user.user_id,
    name: user.full_name,
    status: user.status === 'ACTIVE' ? 'active' : 'inactive',
    left: null,
    right: null
  };

  if (currentDepth < maxDepth) {
    const [children] = await pool.query('SELECT user_id, placement FROM users WHERE sponsor_id = ?', [user_id]);
    const leftChild = children.find(c => c.placement === 'Left Side');
    const rightChild = children.find(c => c.placement === 'Right Side');

    if (leftChild) node.left = await buildTree(leftChild.user_id, currentDepth + 1, maxDepth);
    if (rightChild) node.right = await buildTree(rightChild.user_id, currentDepth + 1, maxDepth);
  }

  return node;
};

const getNetwork = async (req, res) => {
  try {
    // Admin tree starts from the very first root user or admin node
    // Find the first user or admin node
    const [users] = await pool.query('SELECT user_id FROM users ORDER BY id ASC LIMIT 1');
    if (users.length === 0) {
      return res.json({});
    }
    const rootUserId = users[0].user_id;

    const tree = await buildTree(rootUserId, 0, 4); // 4 levels deep for Admin
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlacement = async (req, res) => {
  const { id } = req.params;
  const { placement, sponsorId } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];
    if (placement) {
      updateFields.push('placement = ?');
      updateValues.push(placement);
    }
    if (sponsorId) {
      updateFields.push('sponsor_id = ?');
      updateValues.push(sponsorId);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    updateValues.push(id);
    await pool.query(`UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`, updateValues);
    res.json({ message: 'Placement updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, getMembers, getMemberById, getTransactions, getNotifications, markNotificationsRead, getNetwork, updatePlacement };
