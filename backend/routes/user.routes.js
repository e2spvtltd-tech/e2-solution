const express = require('express');
const router = express.Router();
const { getDashboard, getProfile, requestWithdrawal, getReferrals, getNetwork } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboard);
router.get('/profile', protect, getProfile);
router.post('/withdrawal', protect, requestWithdrawal);
router.get('/referrals', protect, getReferrals);
router.get('/network', protect, getNetwork);
router.put('/password', protect, require('../controllers/user.controller').changePassword);

module.exports = router;
