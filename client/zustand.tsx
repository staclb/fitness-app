import { create } from 'zustand';
import { WorkoutStore, WorkoutsState, AuthState } from '../types/types';
import { fetchWorkoutsByDay } from './api/workoutData';

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: {},
  setWorkouts: (workouts) => set({ workouts }),
  refreshWorkouts: async (unixtime, token) => {
    // sets in map function could not be recognized so needed to establish type of function returned data
    const data = await fetchWorkoutsByDay(unixtime, token) as WorkoutsState;
    // need a type for each outputed object
    const sortedData: WorkoutsState = {};
    // an object with keys that are the exercise names, with arrays as properties, that contain objects which are each set
    Object.entries(data).forEach(([exercise, sets]) => {
      sortedData[exercise] = [...sets].sort((a, b) => a.setId - b.setId)
    });
    set((state) => ({ workouts: sortedData }));
  }
}));

export const userAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token })
}))