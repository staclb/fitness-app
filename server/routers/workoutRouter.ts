import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import workoutController from '../controllers/workoutController';

const router = express.Router();

router.post('/post', workoutController.postWorkout, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({message: 'success'});
});

router.get('/getByDay', workoutController.getWorkoutsByDay, (req: Request, res: Response, next: NextFunction) => {
  // console.log('res.locals.workouts', res.locals.workouts);
  res.status(200).json(res.locals.workouts);
});

router.delete('/delete/:exerciseId', workoutController.deleteWorkout, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({message: 'success'});
});

router.delete('/deleteSet/:setId', workoutController.deleteSet, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({message: 'success'});
});

export default router;
