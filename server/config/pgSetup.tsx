import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const PG_URI =
`${dotenv}`;

const pool = new Pool({
  connectionString: PG_URI,
});

// fix any types for params and callback
module.exports = {
  query: (text: string, params: any, callback: any) => {
    console.log('executed query:', text);
    console.log('query params:', params);
    return pool.query(text, params, callback);
  }
}