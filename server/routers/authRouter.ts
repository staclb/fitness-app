import express from 'express';
import type { Request, Response } from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/signup',
  authController.userSignup,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success' });
  },
);

router.post(
  '/login',
  authController.userLogin,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success', token: res.locals.token });
  },
);

router.post(
  '/auth',
  authController.verifyToken,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success' });
  },
);

router.post('/youtube', authController.youtubeAuth);

router.get('/youtube/callback', authController.youtubeCallback);

export default router;
