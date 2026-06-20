const { pool } = require('../config/db');

/**
 * Calculates the total volume of an entire leg (Left or Right) recursively.
 */
async function getLegVolume(conn, parentUserId, placement) {
  let totalVolume = 0;
  
  // Find the immediate child on this placement (Left or Right)
  const [children] = await conn.query('SELECT id, user_id, volume FROM users WHERE parent_id = ? AND placement = ?', [parentUserId, placement]);
  
  if (children.length === 0) {
    return 0; // No one in this leg
  }

  const child = children[0];
  totalVolume += parseFloat(child.volume || 0);

  // Now, add the entire volume of this child's own left and right legs
  const queue = [child.user_id];
  while (queue.length > 0) {
    const currentId = queue.shift();
    const [subChildren] = await conn.query('SELECT user_id, volume FROM users WHERE parent_id = ?', [currentId]);
    for (const sc of subChildren) {
      totalVolume += parseFloat(sc.volume || 0);
      queue.push(sc.user_id);
    }
  }

  return totalVolume;
}

/**
 * Bubble up from a specific user, recalculating and paying out binary matching
 * bonuses for all ancestors in their network tree.
 */
async function calculateAndPayBinaryBonus(startUserId) {
  try {
    const conn = await pool.getConnection();
    
    try {
      // Find where to start bubbling up
      const [startUserRows] = await conn.query('SELECT parent_id FROM users WHERE user_id = ?', [startUserId]);
      if (startUserRows.length === 0) return;
      
      let currentParentId = startUserRows[0].parent_id;

      // Bubble up the tree
      while (currentParentId) {
        const [parentRows] = await conn.query('SELECT id, user_id, full_name FROM users WHERE user_id = ?', [currentParentId]);
        if (parentRows.length === 0) break;
        
        const parent = parentRows[0];

        // 1 & 2. Get Volume of Left and Right legs
        const leftVolume = await getLegVolume(conn, parent.user_id, 'Left Side');
        const rightVolume = await getLegVolume(conn, parent.user_id, 'Right Side');

        // 3. Find matched volume (least count)
        const matchedVolume = Math.min(leftVolume, rightVolume);

        if (matchedVolume > 0) {
          // 4. Calculate total deserved binary bonus (5% of matched)
          const totalDeserved = matchedVolume * 0.05;

          // 5. Find how much binary bonus was already paid to this user
          const [paidRows] = await conn.query("SELECT SUM(amount) as totalPaid FROM transactions WHERE user_id = ? AND type = 'binary'", [parent.id]);
          const alreadyPaid = parseFloat(paidRows[0].totalPaid || 0);

          // 6. Calculate difference
          const newBonus = totalDeserved - alreadyPaid;

          if (newBonus > 0) {
            // Pay the difference
            await conn.query("UPDATE users SET income_wallet = income_wallet + ? WHERE id = ?", [newBonus, parent.id]);
            
            // Insert Proof Transaction
            await conn.query(
              "INSERT INTO transactions (user_id, title, subtitle, amount, type, status, created_at) VALUES (?, 'Binary Matching Bonus', ?, ?, 'binary', 'COMPLETED', NOW())",
              [parent.id, `5% match from Left(₹${leftVolume}) and Right(₹${rightVolume})`, newBonus]
            );

            // Notify
            await conn.query(
              "INSERT INTO notifications (message, type, user_id) VALUES (?, 'general', ?)",
              [`You received a ₹${newBonus} Binary Matching Bonus from new network volume!`, parent.user_id]
            );
          }
        }

        // Move to the next parent up the tree
        const [nextParentRows] = await conn.query('SELECT parent_id FROM users WHERE user_id = ?', [parent.user_id]);
        currentParentId = nextParentRows.length > 0 ? nextParentRows[0].parent_id : null;
      }
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Error calculating binary bonus:", error);
  }
}

module.exports = { calculateAndPayBinaryBonus, getLegVolume };
