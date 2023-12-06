import express from 'express';
import type { Request, Response } from 'express';
import workoutController from '../controllers/workoutController';
import authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/add',
  authController.verifyToken,
  workoutController.postWorkout,
  (req: Request, res: Response) => {
    res.status(200).json({ setId: res.locals.setId });
  },
);

router.get(
  '/getByDay',
  authController.verifyToken,
  workoutController.getWorkoutsByDay,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.workouts);
  },
);

router.delete(
  '/deleteSet/:setId',
  authController.verifyToken,
  workoutController.deleteSet,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success' });
  },
);

router.delete(
  '/delete/:exerciseId',
  authController.verifyToken,
  workoutController.deleteWorkout,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success' });
  },
);

router.patch(
  '/updateSet/:setId',
  authController.verifyToken,
  workoutController.updateSet,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'success' });
  },
);

export default router;
