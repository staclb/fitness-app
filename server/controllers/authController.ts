import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import { query } from '../config/pgSetup';

// const { JWT_SECRET } = secret;
const { JWT_SECRET } = process.env;

const authController = {
  userSignup: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    try {
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
      await query(insertUserQuery, [username, email, hashedPassword]);

      return next();
    } catch (error) {
      return next({
        log: `Error in authController.userSignup, ${error}`,
        status: 400,
        message: { err: 'Signup failed.' },
      });
    }
  },
  userLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
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
      console.log('here before pw check');
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        console.log(passwordCheck);
        return res.status(400).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET as string,
        {
          expiresIn: '24h',
        },
      );

      res.locals.token = token;
      console.log(token);
      return next();
    } catch (error) {
      return next({
        log: `Error in authController.Login, ${error}`,
        status: 400,
        message: { err: 'Login failure.' },
      });
    }
  },
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res
          .status(400)
          .json({ error: 'No token, authorization denied.' });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET as string);

      res.locals.decodedToken = decodedToken;
      return next();
    } catch (error) {
      return next({
        log: `Error in authController.verifyToken, ${error}`,
        status: 400,
        message: { error: 'Authentication failed, check credentials.' },
      });
    }
  },
  youtubeAuth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:3000/auth/youtube/callback', // Redirect URI
      );

      // Generate the authentication URL
      const scopes = ['https://www.googleapis.com/auth/youtube.readonly']; // Add additional scopes if needed
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });

      // Redirect the user to the authentication URL
      return res.redirect(url);
    } catch (error) {
      return next({
        log: `Error in authController.youtubeAuth, ${error}`,
        status: 400,
        message: { error: 'Youtube authentication failed, check credentials.' },
      });
    }
  },
  youtubeCallback: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:3000/auth/youtube/callback', // Redirect URI
      );
      const { tokens } = await oauth2Client.getToken(req.query.code as string);
      oauth2Client.setCredentials(tokens);
      //
      // Store the tokens in the database associated with the user
      // Add an expiratin timer?
      return res.redirect('/success');
    } catch (error) {
      return next({
        log: `Error in authController.youtubeCallback: ${error}`,
        status: 400,
        message: { error: 'Error retrieving access token.' },
      });
    }
  },
};

export default authController;
