import workoutRouter from './workoutRouter';
import express from 'express';

const router = express.Router();

router.use('/workout', workoutRouter);

export default router;