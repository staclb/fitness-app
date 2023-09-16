import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});


// fix any types for params and callback
// module.exports = {
//   query: (text: string, params: any, callback: any) => {
//     console.log('executed query:', text);
//     console.log('query params:', params);
//     return pool.query(text, params, callback);
//   }
// };
const query = async (text: string, values: any[]) => {
  try {
    // console.log('process.env.PG_URI:', process.env.PG_URI);

    const result = await pool.query(text, values);
    console.log('hi')
    return result;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

export { query };