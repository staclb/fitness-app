import type { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import secret from '../config/secrets';
// import { query } from '../config/pgSetup';

// const { JWT_SECRET } = secret;
import dotenv from 'dotenv';

dotenv.config();
// process.env.PG_URI

const searchController = {
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hi from search contrller')
      const apiKey = process.env.RapidAPI_Key;

      if (typeof apiKey === 'undefined') {
        throw new Error('API key is not defined');
      }

      // const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10';
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Key':
      //       'c3ad929efdmsh9cf3bec5214fb39p12dcc6jsn46c759fef119',
      //     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      //   },
      // };
      // console.log(options)
      // const response = await fetch(url, options);
      // const result = await response.json();
      // console.log(result);
      console.log('hi')

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // res.locals.result = result
      return next();
    } catch (error) {
      return next({
        log: `Error in wgerController.search, ${error}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
};

export default searchController;
