import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../config/pgSetup';

const workoutController = {
  postWorkout: async (req: Request, res: Response, next: NextFunction) => {
    console.log('hi from wk contr');
    // console.log('hi1')
    const { user_id, workout_date, exercise_name, reps, weight, workout_id } = req.body;
    // console.log(req.body);
    try {
      // check if the user has an entry, for the day, and if there is a workout id
      // we need to post the set correctly for the correct user and day
      // frontend should give us exerceise name, reps, weight, workout id(opt), dat

      // let date = Date.now()
      // console.log(new Date(date).toLocaleDateString())

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
  getWorkoutsByDay: async (req: Request, res: Response, next: NextFunction) => {
    console.log('hi from wk contr');
    const { unixtime, user_id, workout_date, exercise_name, sets, reps, weight } = req.body;
    // console.log(req.body);
    try {
      // user selects a day => change to unix time, select all exercises that fall under that day by unix  time in table
      // attach the exercise_name to the sets that have a matching exercise_id; each set has a reps and weight
      // save that to res.locals
      // later will add to search by user_id + unixtime
      // need unix time from start and end of the day that FE sends
      const workoutDate = new Date(unixtime);

      const startOfDay = new Date(workoutDate);
      startOfDay.setHours(0, 0, 0, 0);
      const startOfDayUnixtime = startOfDay.getTime();

      const endOfDay = new Date(workoutDate);
      endOfDay.setHours(23, 59, 59, 999);
      const endOfDayUnixtime = endOfDay.getTime();

      const query = `
        SELECT exercises.excercise_name, sets.reps, sets.weight
        FROM exercises
        JOIN sets ON exercises.exercises.id = sets.exercises_id
        WHERE exercises.user_id = $1
        AND exercises.date_unixtime >= $2
        AND exercises.date_unixtime <= $3
      `;

      const queryValues = [user_id, startOfDayUnixtime, endOfDayUnixtime];

      const result = await query(query, queryValues);

      console.log('result', result);

      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.postWorkout, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
  // getSetsByDay: async (req: Request, res: Response, next: NextFunction) => {
  //   console.log('hi from wk contr');
  //   const { user_id, workout_date, exercise_name, sets, reps, weight } = req.body;
  //   // console.log(req.body);
  //   try {
  //     // attach the
  //     return next();
  //   } catch (error) {
  //     return next({
  //       log: `Error in workoutController.postWorkout, ${error}`,
  //       status: 400,
  //       message: { err: 'An error occurred' }
  //     });
  //   }
  // }
};

export default workoutController;

// console.log(user_id, workout_date, exercise_name, sets, reps, weight);
// const text = `
// INSERT into workouts (user_id, workout_date, exercise_name, sets, reps, weight)
// VALUES ($1, $2, $3, $4, $5, $6)
// `;
// // const workout_date = Date.now();
// const values = [user_id, workout_date, exercise_name, sets, reps, weight];
// await query(text, values);