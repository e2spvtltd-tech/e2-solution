require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./config/db');

async function seedData() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Clearing old data...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DROP TABLE IF EXISTS notifications');
    await connection.query('TRUNCATE TABLE transactions');
    await connection.query('TRUNCATE TABLE users');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255) NOT NULL,
        type ENUM('registration', 'investment', 'withdrawal', 'general') DEFAULT 'general',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Inserting demo users...');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // 1. Admin
    await connection.query(`
      INSERT INTO users (full_name, mobile, email, password, user_id, role, status, volume, main_wallet, income_wallet, created_at)
      VALUES ('System Admin', '9999999999', 'admin@ec2.com', ?, 'BRIMLM-1000', 'ADMIN', 'ACTIVE', 0, 0, 0, '2023-01-01 10:00:00')
    `, [password]);

    // Generate random users
    const users = [
      { name: 'John Doe', uid: 'BMLM-1001', sponsor: 'BRIMLM-1000', placement: 'Left Side' },
      { name: 'Jane Smith', uid: 'BMLM-1002', sponsor: 'BRIMLM-1000', placement: 'Right Side' },
      
      { name: 'Alice Johnson', uid: 'BMLM-1003', sponsor: 'BMLM-1001', placement: 'Left Side' },
      { name: 'Bob Williams', uid: 'BMLM-1004', sponsor: 'BMLM-1001', placement: 'Right Side' },
      
      { name: 'Charlie Brown', uid: 'BMLM-1005', sponsor: 'BMLM-1002', placement: 'Left Side' },
      { name: 'Diana Prince', uid: 'BMLM-1006', sponsor: 'BMLM-1002', placement: 'Right Side' },
      
      { name: 'Eve Adams', uid: 'BMLM-1007', sponsor: 'BMLM-1003', placement: 'Left Side' },
      { name: 'Frank Castle', uid: 'BMLM-1008', sponsor: 'BMLM-1004', placement: 'Left Side' },
      
      { name: 'Grace Hopper', uid: 'BMLM-1009', sponsor: 'BMLM-1005', placement: 'Right Side' },
      { name: 'Hank Pym', uid: 'BMLM-1010', sponsor: 'BMLM-1006', placement: 'Left Side' }
    ];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      const volume = Math.floor(Math.random() * 5000) + 1000;
      const main_wallet = Math.floor(Math.random() * 1000);
      const income_wallet = Math.floor(Math.random() * 2000);
      
      // Random date in the last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      await connection.query(`
        INSERT INTO users (full_name, mobile, email, password, sponsor_id, user_id, status, placement, volume, main_wallet, income_wallet, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?, ?, ?)
      `, [u.name, `98765432${i.toString().padStart(2, '0')}`, `user${i}@demo.com`, password, u.sponsor, u.uid, u.placement, volume, main_wallet, income_wallet, date]);
    }

    console.log('Inserting transactions...');
    // We will get all users
    const [allUsers] = await connection.query("SELECT id, user_id FROM users WHERE role='USER'");
    
    for (const u of allUsers) {
      // 1-3 deposits
      for(let j=0; j<Math.floor(Math.random()*3)+1; j++) {
        await connection.query(`
          INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at)
          VALUES (?, 'Package Upgrade', 'Premium Plan', ?, 'deposit', 'COMPLETED', NOW() - INTERVAL ? DAY)
        `, [u.id, Math.floor(Math.random()*5000)+1000, Math.floor(Math.random()*30)]);
      }

      // ROI incomes
      await connection.query(`
        INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at)
        VALUES (?, 'Daily ROI', 'Investment Return', ?, 'roi', 'COMPLETED', NOW())
      `, [u.id, Math.floor(Math.random()*50)+10]);

      // Binary Incomes
      await connection.query(`
        INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at)
        VALUES (?, 'Binary Matching', 'Pair Match', ?, 'binary', 'COMPLETED', NOW())
      `, [u.id, Math.floor(Math.random()*200)+50]);
      
      // Referral Incomes
      await connection.query(`
        INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at)
        VALUES (?, 'Direct Referral', 'New Member', ?, 'referral', 'COMPLETED', NOW() - INTERVAL ? DAY)
      `, [u.id, Math.floor(Math.random()*150)+50, Math.floor(Math.random()*15)]);
      
      // Pending Withdrawal
      if (Math.random() > 0.7) {
        await connection.query(`
          INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at)
          VALUES (?, 'Withdrawal Request', 'Bank Transfer', ?, 'withdrawal', 'PENDING', NOW())
        `, [u.id, -(Math.floor(Math.random()*500)+100)]);
      }
    }

    console.log('Inserting notifications...');
    await connection.query(`
      INSERT INTO notifications (message, type, created_at) VALUES 
      ('New user registered: John Doe (BMLM-1001)', 'registration', NOW() - INTERVAL 1 HOUR),
      ('Payout Request: $500 pending approval', 'withdrawal', NOW() - INTERVAL 2 HOUR),
      ('System Update: Routine maintenance', 'general', NOW() - INTERVAL 5 HOUR)
    `);

    console.log('Seeding Complete! Demo data successfully added.');
    connection.release();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedData();
