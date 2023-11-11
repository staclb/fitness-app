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

      // add condition if name is provied from FE and doesnt exist, then create exercise + set entry
      // otherwise find the exercie_id and add a set

      // rep code from postWorkout function => might need to import from anotehr file
      const workoutDate = new Date(unixtime);

      const startOfDay = new Date(workoutDate);
      startOfDay.setHours(0, 0, 0, 0);
      const startOfDayUnixtime = startOfDay.getTime();

      const endOfDay = new Date(workoutDate);
      endOfDay.setHours(23, 59, 59, 999);
      const endOfDayUnixtime = endOfDay.getTime();
      //
      const checkExerciseQuery = `
        SELECT exercise_id
        FROM exercises
        WHERE user_id = $1
          AND exercise_name = $2
          AND date_unixtime >= $3
          AND date_unixtime <= $4
      `;
      const queryValues = [user_id, name, startOfDayUnixtime, endOfDayUnixtime];
      let result = await query(checkExerciseQuery, queryValues);

      if (result.rows.length > 0) {
        result = result.rows[0].exercise_id;
      } else {
        const insertExerciseQuery = `
          INSERT into exercises (user_id, exercise_name, date_unixtime)
          VALUES ($1, $2, $3)
          RETURNING exercise_id;
        `;
        const exerciseValues = [user_id, name, unixtime];
        const insertWorkoutResult = await query(insertExerciseQuery, exerciseValues);
        result = insertWorkoutResult.rows[0].exercise_id;
      }

      const insertSetQuery = `
          INSERT into sets (exercise_id, reps, weight)
          VALUES ($1, $2, $3)
        `;
      const setValues = [result, reps, weight];
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
        SELECT exercises.exercise_id, exercises.exercise_name, sets.set_id, sets.reps, sets.weight
        FROM exercises
        JOIN sets ON exercises.exercise_id = sets.exercise_id
        WHERE exercises.user_id = $1
          AND exercises.date_unixtime >= $2
          AND exercises.date_unixtime <= $3
      `;

      const queryValues = [user_id, startOfDayUnixtime, endOfDayUnixtime];
      const result = await query(exerciseQuery, queryValues);
      // console.log(result.rows)
      const data = result.rows;
      // go through arr of wk objects
      // assocaite each exercise name with sets => reps +weight
      // Process the rawData into the desired format.
      const parsedData: { [key: string]: { exercise_id: number; set_id: number; reps: number; weight: number } [] } = {};

      // added set and workout id to data for frontend => delete/update functionality
      data.forEach((row) => {
        if (!parsedData[row.exercise_name]) {
          parsedData[row.exercise_name] = [];
        }
        parsedData[row.exercise_name].push({
          exercise_id: row.exercise_id,
          set_id: row.set_id,
          reps: row.reps,
          weight: Number(row.weight) // Parse the weight as a number
        });
      });
      // console.log('parsedData', parsedData)
      res.locals.workouts = parsedData;
      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.getWorkoutsByDay, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
  deleteWorkout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { exerciseId } = req.params;
      // first check if the entry in the exercises table for the exercise id has entries in the sets table
      // if it does then delete all sets table entries for that id
      // if not, or after deleting all sets table entries then delete the exercise table entry under the id
      const setsQuery = `
        SELECT * 
        FROM sets
        WHERE exercise_id = $1
      `;
      // query function requires the values to be in an array
      const setQueryValues = [exerciseId];
      const { rows } = await query(setsQuery, setQueryValues);
      console.log('result', rows);

      if (rows.length > 0) {
        const deleteSetsQuery = `
          DELETE FROM sets
          WHERE exercise_id = $1
        `;
        await query(deleteSetsQuery, setQueryValues);
      }

      const deleteExerciseQuery = `
        DELETE FROM exercises
        WHERE exercise_id = $1
      `;
      await query(deleteExerciseQuery, setQueryValues);

      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.deleteWorkout, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
  deleteSet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { setId } = req.params;
      console.log(setId);
      const deleteSetQuery = `
        DELETE FROM sets
        WHERE set_id = $1
      `;
      const setQueryValues = [setId];
      await query(deleteSetQuery, setQueryValues);

      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.deleteSet, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  },
  updateSet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { setId } = req.params;
      const { reps, weight } = req.body;
      // console.log(reps, weight);
      // console.log(setId);
      const updateSetQuery = `
        UPDATE sets
        SET weight = $1, reps = $2
        WHERE set_id = $3
        `;
      const setQueryValues = [Number(weight), Number(reps), Number(setId)];
      console.log(setQueryValues)
      await query(updateSetQuery, setQueryValues);
      return next();
    } catch (error) {
      return next({
        log: `Error in workoutController.updateSet, ${error}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
  }
};

export default workoutController;
