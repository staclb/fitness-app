import type { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
import secret from '../config/secrets';
import { query } from '../config/pgSetup';

// const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
// const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const { JWT_SECRET } = secret;

const authController = {
  userSignup: async (req: Request, res: Response, next: NextFunction) => {
    // extract neccesary data from req body
    // check if the user exists, if so go next
    // if not create a user, then go next
    const { username, password, email } = req.body;
    // console.log('hi', username, password, email);

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
      // console.log('result', result);
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
    const { username, password } = req.body;
    try {
      const checkUserQuery = `
        SELECT * 
        FROM users
        WHERE username = $1
      `;
      const userResult = await query(checkUserQuery, [username]);
      if (userResult.rows.length === 0) {
        console.log('Username does not exist');
        return res.status(400).json({ error: 'Username does not exist' });
      }

      const user = userResult.rows[0];
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: '24h',
        },
      );
      console.log('token', token)
      res.locals.token = token;
      return next();
    } catch (error) {
      return next({
        log: `Error in authController.Login, ${error}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('req', req)
      const token = req.headers.authorization?.split(' ')[1];
      // console.log('token', token)
      if (!token) {
        return res
          .status(400)
          .json({ error: 'No token, authoraization denied' });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log(decodedToken)
      // res.locals.decodedToken = decodedToken;
      // console.log(res.locals, res.locals.decodedToken)
      return next();
    } catch (error) {
      return next({
        log: `Error in authController.verifyToken, ${error}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
};

export default authController;
