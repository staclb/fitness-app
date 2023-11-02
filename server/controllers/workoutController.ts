import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../config/pgSetup';

const workoutController = {
  postWorkout: async (req: Request, res: Response, next: NextFunction) => {
    const { name, weight, reps, user_id, unixtime } = req.body;
    try {
      // we have name, weight, reps for a workout
      // basic functionality would be to save the three fields into the db
      // create an entry in the exercises table => user_id, name, unixtime
      // then an entry in the sets table => exercise_id, reps, weight

      // need to add logic that checks if an exercise exists already for a user on that day
      // if so then just add a set to the set table for that exercise_id
      const insertExerciseQuery = `
        INSERT into exercises (user_id, exercise_name, date_unixtime)
        VALUES ($1, $2, $3)
        RETURNING exercise_id;
      `;
      const exerciseValues = [user_id, name, unixtime];
      const result = await query(insertExerciseQuery, exerciseValues);
      const exercise_id = result.rows[0].exercise_id;

      const insertSetQuery = `
        INSERT into sets (exercise_id, reps, weight)
        VALUES ($1, $2, $3)
      `;
      const setValues = [exercise_id, reps, weight];
      await query(insertSetQuery, setValues);

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
    const { unixtime, user_id, workout_date, exercise_name, sets, reps, weight } = req.query;
    try {
      // user selects a day => change to unix time, select all exercises that fall under that day by unix  time in table
      // attach the exercise_name to the sets that have a matching exercise_id; each set has a reps and weight
      // save that to res.locals
      // later will add to search by user_id + unixtime
      // need unix time from start and end of the day that FE sends
      // date obj needs an explicit type => number
      const unixTimeNumber = Number(unixtime);
      const workoutDate = new Date(unixTimeNumber);

      const startOfDay = new Date(workoutDate);
      startOfDay.setHours(0, 0, 0, 0);
      const startOfDayUnixtime = startOfDay.getTime();

      const endOfDay = new Date(workoutDate);
      endOfDay.setHours(23, 59, 59, 999);
      const endOfDayUnixtime = endOfDay.getTime();

      const exerciseQuery = `
        SELECT exercises.exercise_name, sets.reps, sets.weight
        FROM exercises
        JOIN sets ON exercises.exercise_id = sets.exercise_id
        WHERE exercises.user_id = $1
        AND exercises.date_unixtime >= $2
        AND exercises.date_unixtime <= $3
      `;

      const queryValues = [user_id, startOfDayUnixtime, endOfDayUnixtime];
      const result = await query(exerciseQuery, queryValues);
      const data = result.rows;
      // go through arr of wk objects
      // assocaite each exercise name with sets => reps +weight
      // Process the rawData into the desired format.
      const parsedData: { [key: string]: { reps: number; weight: number }[] } = {};

      data.forEach((row) => {
        if (!parsedData[row.exercise_name]) {
          parsedData[row.exercise_name] = [];
        }
        parsedData[row.exercise_name].push({
          reps: row.reps,
          weight: parseFloat(row.weight) // Parse the weight as a number
        });
      });
      res.locals.workouts = parsedData;
      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.postWorkout, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
};

export default workoutController;
