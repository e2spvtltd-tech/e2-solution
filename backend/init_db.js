require('dotenv').config();
const { pool } = require('./config/db');

async function initDB() {
  try {
    const connection = await pool.getConnection();

    console.log('Dropping existing tables...');
    await connection.query('DROP TABLE IF EXISTS transactions');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        sponsor_id VARCHAR(50),
        parent_id VARCHAR(50) NULL,
        user_id VARCHAR(50) UNIQUE,
        role ENUM('USER', 'ADMIN') DEFAULT 'USER',
        status ENUM('ACTIVE', 'PENDING KYC', 'INACTIVE') DEFAULT 'ACTIVE',
        placement ENUM('Left Side', 'Right Side', 'Pending') DEFAULT 'Pending',
        volume DECIMAL(15,2) DEFAULT 100000.00,
        team_size INT DEFAULT 0,
        main_wallet DECIMAL(15,2) DEFAULT 100000.00,
        income_wallet DECIMAL(15,2) DEFAULT 0.00,
        bonus_wallet DECIMAL(15,2) DEFAULT 0.00,
        plan_expiry_date DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating transactions table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(100),
        subtitle VARCHAR(100),
        amount DECIMAL(15,2) NOT NULL,
        type ENUM('withdrawal', 'deposit', 'payout', 'referral', 'binary', 'roi') NOT NULL,
        status ENUM('PENDING', 'COMPLETED', 'REJECTED') DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('Creating notifications table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255) NOT NULL,
        type ENUM('registration', 'investment', 'withdrawal', 'general') DEFAULT 'general',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();
