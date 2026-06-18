const express = require('express');
const { getDashboardStats, getMembers, getMemberById, getTransactions, getNotifications, markNotificationsRead, getNetwork, updatePlacement, getAdminProfile } = require('../controllers/admin.controller');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/members', protect, admin, getMembers);
router.get('/transactions', protect, admin, getTransactions);
router.get('/notifications', protect, admin, getNotifications);
router.put('/notifications/mark-read', protect, admin, markNotificationsRead);
router.get('/network', protect, admin, getNetwork);
router.get('/profile', protect, admin, getAdminProfile);
router.get('/members/:id', protect, admin, getMemberById);
router.put('/members/:id/placement', protect, admin, updatePlacement);

module.exports = router;
