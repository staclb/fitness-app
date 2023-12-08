import { create } from 'zustand';
import {
  WorkoutStore,
  WorkoutsState,
  AuthState,
  ExercisesState,
  ExercisesStore,
  Exercises,
} from '../types/types';
import { fetchWorkoutsByDay } from './api/workoutData';

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: {},
  setWorkouts: (workouts) => set({ workouts }),
  refreshWorkouts: async (unixtime, token) => {
    // sets in map function could not be recognized so needed to establish type of function returned data
    const data = (await fetchWorkoutsByDay(unixtime, token)) as WorkoutsState;
    // need a type for each outputed object
    const sortedData: WorkoutsState = {};
    // sort sets within each exercise
    Object.entries(data).forEach(([exercise, sets]) => {
      sortedData[exercise] = [...sets].sort((a, b) => b.setId - a.setId);
    });
    // sort each exercise by id
    const sortedExercises = Object.entries(sortedData).sort((a, b) => {
      const exerciseIdA = Number(a[1][0]?.exerciseId);
      const exerciseIdB = Number(b[1][0]?.exerciseId);
      return exerciseIdB - exerciseIdA;
    });

    // create the workouts object with sorted data
    const orderedData: WorkoutsState = {};
    sortedExercises.forEach(([exercise, sets]) => {
      orderedData[exercise] = sets;
    });

    set((state) => ({ workouts: orderedData }));
  },
}));

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export const useExerciseStore = create<ExercisesStore>((set) => ({
  exercises: { exercises: [] },
  setExercises: (exercises) => set({ exercises }),
}));
