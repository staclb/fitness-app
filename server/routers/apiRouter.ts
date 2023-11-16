import express from 'express';
import workoutRouter from './workoutRouter';
import authRouter from './authRouter';
import wgerRouter from './wgerRouter';

const router = express.Router();

router.use('/workout', workoutRouter);
router.use('/auth', authRouter);
router.use('/wger', wgerRouter);

export default router;
