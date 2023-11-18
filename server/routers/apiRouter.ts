import express from 'express';
import workoutRouter from './workoutRouter';
import authRouter from './authRouter';
import searchRouter from './searchRouter';
import exerciseRouter from './exerciseRouter';

const router = express.Router();

router.use('/workout', workoutRouter);
router.use('/auth', authRouter);
router.use('/search', searchRouter);
router.use('/exercise', exerciseRouter);

export default router;
