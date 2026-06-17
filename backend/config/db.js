const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    // Attempt to get a connection to verify everything is working
    const connection = await pool.getConnection();
    console.log(`MySQL Database Connected: ${process.env.DB_HOST || 'localhost'}`);
    connection.release(); // release the connection back to the pool
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
