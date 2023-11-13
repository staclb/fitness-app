import express from 'express';
import workoutRouter from './workoutRouter';
import authRouter from './authRouter';

const router = express.Router();

router.use('/workout', workoutRouter);
router.use('/auth', authRouter);

export default router;
