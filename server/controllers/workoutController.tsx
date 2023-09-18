import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../config/pgSetup';

const workoutController = {
  postWorkout: async (req: Request, res: Response, next: NextFunction) => {
    console.log('hi from wk contr');
    const { user_id, workout_date, exercise_name, sets, reps, weight } = req.body;
    console.log(req.body);
    try {
      console.log(user_id, workout_date, exercise_name, sets, reps, weight);
      const text = `
      INSERT into workouts (user_id, workout_date, exercise_name, sets, reps, weight)
      VALUES ($1, $2, $3, $4, $5, $6)
      `;
      // const workout_date = Date.now();
      const values = [user_id, workout_date, exercise_name, sets, reps, weight];
      await query(text, values);
      return next();
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