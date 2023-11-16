import type { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import secret from '../config/secrets';
// import { query } from '../config/pgSetup';

// const { JWT_SECRET } = secret;

const wgerController = {
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hi from wger');
      const response = await fetch('https://wger.de/api/v2/exercise/');
      const data = await response.json();
      const names = data.results.map((object: any) => object.name);
      console.log('data: ', names);
      console.log(names.length);
      // console.log(data)
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

export default wgerController;
