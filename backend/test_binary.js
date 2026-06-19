require('dotenv').config();
const { pool } = require('./config/db');
const { calculateAndPayBinaryBonus } = require('./utils/binary');

async function test() {
  try {
    console.log("Testing calculateAndPayBinaryBonus for user E2S-1004...");
    await calculateAndPayBinaryBonus('E2S-1004');
    console.log("Completed.");
  } catch(e) {
    console.error(e);
  } finally {
    process.exit();
  }
}

test();
