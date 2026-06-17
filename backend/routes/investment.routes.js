const express = require('express');
const { createInvestment } = require('../controllers/investment.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createInvestment);

module.exports = router;
