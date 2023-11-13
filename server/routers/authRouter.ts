import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/signup',
  authController.userSignup,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'success' });
  },
);

export default router;
