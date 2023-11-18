import express from 'express';
import type { Request, Response } from 'express';
import exerciseController from '../controllers/exerciseController';

const router = express.Router();

router.get(
  '/search',
  exerciseController.searchExercise,
  (req: Request, res: Response) => {
    res.status(200).json({ exercises: res.locals.data });
  },
);

export default router;
