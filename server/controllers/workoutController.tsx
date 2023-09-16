import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { nextTick } from 'process';

const workoutController = {
  postWorkout: async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
      return next({
        log: `Error in workoutController.postWorkout, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  }
};

export default workoutController;