require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
const compression = require('compression');
app.use(compression());
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const investmentRoutes = require('./routes/investment.routes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/investments', investmentRoutes);

// Initialize Cron Jobs
require('./cron/roi.cron');

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown to prevent database connection exhaustion during nodemon restarts
const { pool } = require('./config/db');

const shutdown = async () => {
  console.log('Shutting down server and closing database connections...');
  if (pool) {
    try {
      await pool.end();
      console.log('Database pool closed.');
    } catch (err) {
      console.error('Error closing database pool', err);
    }
  }
  server.close(() => {
    process.exit(0);
  });
};

process.once('SIGUSR2', shutdown); // For nodemon restarts
process.on('SIGINT', shutdown);  // For Ctrl+C
process.on('SIGTERM', shutdown); // For normal termination
