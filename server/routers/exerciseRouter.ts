import express from 'express';
import type { Request, Response } from 'express';
import exerciseController from '../controllers/exerciseController';
import authController from '../controllers/authController';

const router = express.Router();

router.get(
  '/search',
  exerciseController.searchExercise,
  (req: Request, res: Response) => {
    res.status(200).json({ exercises: res.locals.data });
  },
);

router.get('/shorts', authController.verifyToken, exerciseController.ytShorts);

export default router;
