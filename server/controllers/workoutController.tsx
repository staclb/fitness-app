import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../config/pgSetup';

const workoutController = {
  postWorkout: async (req: Request, res: Response, next: NextFunction) => {
    console.log('hi from wk contr');
    // console.log('hi1')
    const { user_id, workout_date, exercise_name, reps, weight, workout_id } = req.body;
    // console.log(req.body);
    try {
      // console.log(user_id, workout_date, exercise_name, reps, weight, workout_id);
      const exerciseQuery = `
      INSERT into exercises (user_id, date_unixtime, exercise_name, workout_id)
      VALUES ($1, $2, $3, $4)
      RETURNING exercise_id;
      `;
      // const workout_date = Date.now();
      const setQuery = `
      INSERT INTO sets (workout_id, reps, weight)
      VALUES ($1, $2, $3)
      `;
      // console.log('hi')
      // console.log(typeof exercise_name)
      const exerciseValues = [user_id, exercise_name, workout_date, workout_id];
      console.log(exerciseValues)
      const exerciseResult = await query(exerciseQuery, exerciseValues);

      const exerciseId = exerciseResult.rows[0].exercise_id;

      const setValues = [exerciseId, reps, weight];

      
      await query(setQuery, setValues);

      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.postWorkout, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
  getWorkout: async (req: Request, res: Response, next: NextFunction) => {
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