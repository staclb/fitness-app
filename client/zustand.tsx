import { create } from 'zustand';
import { WorkoutStore } from '../types/types';
import { fetchWorkoutsByDay, postWorkout, deleteWorkout, deleteSet } from './api/workoutData';

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: {},
  setWorkouts: (workouts) => set({ workouts }),
  refreshWorkouts: async (unixtime, user_id) => {
    const data = await fetchWorkoutsByDay(unixtime, user_id);
    set((state) => ({ workouts: data }));
  }
  // ...
}));