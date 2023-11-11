import { create } from 'zustand';
import { WorkoutStore, WorkoutsState } from '../types/types';
import { fetchWorkoutsByDay } from './api/workoutData';

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: {},
  setWorkouts: (workouts) => set({ workouts }),
  refreshWorkouts: async (unixtime, user_id) => {
    // sets in map function could not be recognized so needed to establish type of function returned data
    const data = await fetchWorkoutsByDay(unixtime, user_id) as WorkoutsState;
    // need a type for each outputed object
    const sortedData: WorkoutsState = {};
    // an object with keys that are the exercise names, with arrays as properties, that contain objects which are each set
    Object.entries(data).forEach(([exercise, sets]) => {
      sortedData[exercise] = [...sets].sort((a, b) => a.set_id - b.set_id)
    });
    set((state) => ({ workouts: sortedData }));
  }
}));