import express from 'express';
import type { Request, Response } from 'express';
import wgerController from '../controllers/wgerController';

const router = express.Router();

router.get('/search', wgerController.search, (req: Request, res: Response) => {
  res.status(200).json({ message: 'success' });
});

export default router;
