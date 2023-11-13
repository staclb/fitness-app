import type { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../config/pgSetup';

const authController = {
  userSignup: async (req: Request, res: Response, next: NextFunction) => {
    // extract neccesary data from req body
    // check if the user exists, if so go next
    // if not create a user, then go next
    const { username, password, email } = req.body;
    console.log('hi', username, password, email);

    try {
      // check if email exists in db
      // if not then create query + hash pw
      const emailCheckQuery = `
        SELECT * 
        FROM users
        WHERE email = $1
      `;
      const emailResult = await query(emailCheckQuery, [email]);

      if (emailResult.rows.length > 0) {
        console.log('Email exists already');
        return res.status(400).json({ error: 'Email exists already' });
      }

      const usernameCheckQuery = `
        SELECT * 
        FROM users
        WHERE username = $1
      `;
      const usernameResult = await query(usernameCheckQuery, [username]);

      if (usernameResult.rows.length > 0) {
        console.log('Username exists already');
        return res.status(400).json({ error: 'Username exists already' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = `
        INSERT INTO users (username, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING id
      `;
      const result = await query(insertUserQuery, [
        username,
        email,
        hashedPassword,
      ]);
      console.log('result', result);
      return next();
    } catch (error) {
      return next({
        log: `Error in authController.userSignup, ${error}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
  userLogin: async (req: Request, res: Response, next: NextFunction) => { 

  },
};

export default authController;
