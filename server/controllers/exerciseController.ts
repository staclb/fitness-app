import type { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

const exerciseController = {
  searchExercise: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { muscle, offset, type, name, difficulty } = req.query;
      // console.log('muscle: ', muscle);
      // console.log('offset:', offset);
      // console.log('type:', type);
      // console.log('name:', name);
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
      // console.log(url)
      const options = {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      };
      // console.log(url);
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data)
      // const exerciseNames = data.map((exercise: any) => exercise.name);
      // console.log(exerciseNames);
      res.locals.data = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in testController.apeCheck, ${error}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
};

export default exerciseController;
