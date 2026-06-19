require('dotenv').config();
const { pool } = require('./config/db');

async function migrate() {
  console.log('Starting User ID migration...');
  const conn = await pool.getConnection();
  
  try {
    await conn.beginTransaction();

    const [users] = await conn.query('SELECT id, user_id, sponsor_id, mobile, role FROM users');
    
    const idMap = new Map();
    const usedIds = new Set();
    
    // First pass: generate new IDs
    for (const user of users) {
      let newId;
      if (user.role === 'ADMIN' || user.user_id === 'E2S-1000' || user.user_id === 'BRIMLM-1000' || user.user_id === 'BMLM-1000') {
        newId = 'E2S-1000';
      } else {
        const mobile = user.mobile || '';
        const last4 = mobile.length >= 4 ? mobile.slice(-4) : Math.floor(1000 + Math.random() * 9000).toString();
        
        let baseId = 'E2S-' + last4;
        let attempt = 0;
        newId = baseId;
        
        while (usedIds.has(newId)) {
          attempt++;
          newId = baseId + String.fromCharCode(64 + attempt); // A, B, C...
        }
      }
      
      usedIds.add(newId);
      idMap.set(user.user_id, newId);
      
      // Update the user_id in users table immediately
      await conn.query('UPDATE users SET user_id = ? WHERE id = ?', [newId, user.id]);
      console.log(`Mapped ${user.user_id} -> ${newId}`);
    }

    // Second pass: update sponsor_ids
    for (const user of users) {
      if (user.sponsor_id) {
        let newSponsorId = idMap.get(user.sponsor_id);
        
        // If sponsor_id wasn't in the DB (dangling), fallback to admin
        if (!newSponsorId) {
          if (user.sponsor_id === 'E2S-100000' || user.sponsor_id === 'BRIMLM-100000') {
            newSponsorId = 'E2S-100000'; // Special system root
          } else {
            newSponsorId = 'E2S-1000';
          }
        }
        
        await conn.query('UPDATE users SET sponsor_id = ? WHERE id = ?', [newSponsorId, user.id]);
      }
    }

    // Third pass: update transaction metadata if needed
    // (Optional, but safe to skip for a dev environment, they just look like old logs)
    
    await conn.commit();
    console.log('Migration completed successfully!');

  } catch (error) {
    await conn.rollback();
    console.error('Migration failed:', error);
  } finally {
    conn.release();
    process.exit(0);
  }
}

migrate();
