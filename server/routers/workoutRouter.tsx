import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import workoutController from '../controllers/workoutController';

const router = express.Router();

router.post('/post', workoutController.postWorkout, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({message: 'success'});
});

router.get('/get', workoutController.getWorkout, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.workouts);
});

export default router;
