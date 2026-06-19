const express = require('express');
const { createInvestment, renewPlan } = require('../controllers/investment.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createInvestment);
router.post('/renew', protect, renewPlan);

module.exports = router;
