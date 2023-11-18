import express from 'express';
import type { Request, Response } from 'express';
import searchController from '../controllers/searchController';

const router = express.Router();

router.get(
  '/search',
  searchController.search,
  (req: Request, res: Response) => {
    res.status(200).json({ message: res.locals.data });
  },
);

export default router;
