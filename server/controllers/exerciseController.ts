import type { Request, Response, NextFunction } from 'express';

const exerciseController = {
  searchExercise: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { muscle, offset, type, name, difficulty } = req.query;
      const apiKey = process.env.NINJA_APIKEY || '';

      const queryParams = [];

      if (muscle) {
        queryParams.push(`muscle=${muscle}`);
      }
      if (offset !== undefined) {
        queryParams.push(`offset=${offset}`);
      }
      if (type) {
        queryParams.push(`type=${type}`);
      }
      if (name) {
        queryParams.push(`name=${name}`);
      }
      if (difficulty) {
        queryParams.push(`difficulty=${difficulty}`);
      }

      const url = `https://api.api-ninjas.com/v1/exercises?${queryParams.join(
        '&',
      )}`;
      const options = {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      res.locals.data = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in testController.apeCheck, ${error}`,
        status: 400,
        message: { err: 'Searching for exercise failed.' },
      });
    }
  },
  ytShorts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error) {
      return next({
        log: `Error in exerciseController.ytShorts, ${error}`,
        status: 400,
        message: { err: 'Searching for exercise failed.' },
      });
    }
  },
};

export default exerciseController;
