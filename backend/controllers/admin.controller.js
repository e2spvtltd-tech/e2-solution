const { pool } = require('../config/db');
const { calculateAndPayBinaryBonus } = require('../utils/binary');

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
      totalInvestments: parseFloat(revenueResult[0].total || 0),
      activeInvestments: 0, // Zeroed out demo data
      pendingWithdrawals: parseFloat(Math.abs(withdrawalsResult[0].total || 0)),
      todayJoinings: 0, // Zeroed out demo data
      todayROI: parseFloat(roiResult[0].total || 0),
      todayBinary: parseFloat(binaryResult[0].total || 0),
      todayReferral: parseFloat(refResult[0].total || 0),
      totalRevenue: parseFloat(revenueResult[0].total || 0),
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
    if (user_id === 'E2S-1000') {
      sponsorIds.push('E2S-1000');
      sponsorIds.push('E2S-100000');
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
  const { placement, parentId, sponsorId } = req.body;
  const targetParentId = parentId || sponsorId;

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

    // Target sponsor/parent defaults to the user's original sponsor_id if not provided
    const finalParentId = targetParentId || userToPlace.sponsor_id || 'E2S-1000';

    // 2. Verify target parent exists
    const [parents] = await pool.query('SELECT * FROM users WHERE user_id = ?', [finalParentId]);
    if (parents.length === 0) {
      return res.status(404).json({ message: 'Target parent user not found' });
    }
    const parent = parents[0];

    // 3. Verify that the position is not already occupied
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

    res.json({ message: 'Placement updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const [admins] = await pool.query("SELECT full_name, mobile, email, user_id FROM users WHERE role = 'ADMIN' ORDER BY id ASC LIMIT 1");
    if (admins.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({
      fullName: admins[0].full_name,
      mobile: admins[0].mobile,
      email: admins[0].email,
      userId: admins[0].user_id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, mobile } = req.body;
  try {
    await pool.query(
      'UPDATE users SET full_name = ?, mobile = ? WHERE user_id = ?',
      [full_name, mobile, id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query('SELECT status FROM users WHERE user_id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    const newStatus = users[0].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await pool.query('UPDATE users SET status = ? WHERE user_id = ?', [newStatus, id]);
    res.json({ message: 'User status updated successfully', status: newStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query('SELECT id FROM users WHERE user_id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    
    await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const [reports] = await pool.query(`
      SELECT 
        u.user_id as idNo, 
        u.full_name as name, 
        u.mobile, 
        u.volume as investment,
        COALESCE(SUM(CASE WHEN t.type = 'binary' AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as binaryIncome,
        COALESCE(SUM(CASE WHEN t.type = 'referral' AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as drIncome,
        COALESCE(SUM(CASE WHEN t.type IN ('roi', 'binary', 'referral') AND t.status = 'COMPLETED' THEN t.amount ELSE 0 END), 0) as totalIncome,
        COALESCE(SUM(CASE WHEN t.type = 'withdrawal' AND t.status = 'COMPLETED' THEN ABS(t.amount) ELSE 0 END), 0) as payout
      FROM users u
      LEFT JOIN transactions t ON u.id = t.user_id
      WHERE u.role = 'USER'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    res.json(reports.map(r => ({
      idNo: r.idNo,
      name: r.name,
      mobile: r.mobile,
      investment: parseFloat(r.investment || 0),
      binary: parseFloat(r.binaryIncome || 0),
      dr: parseFloat(r.drIncome || 0),
      total: parseFloat(r.totalIncome || 0),
      payout: parseFloat(r.payout || 0),
      profit: parseFloat(r.totalIncome || 0) - parseFloat(r.payout || 0)
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, getMembers, getMemberById, getTransactions, getNotifications, markNotificationsRead, getNetwork, updatePlacement, getAdminProfile, updateUser, toggleUserStatus, deleteUser, getReports };
