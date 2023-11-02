import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});


// fix any types for params and callback
const query = async (text: string, values: any[]) => {
  try {
    const result = await pool.query(text, values);
    console.log('text:', text);
    return result;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

export { query };