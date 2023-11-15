import type { RequestHandler } from 'express';

export interface ServerError {
  err: '400';
}

export interface workoutController {
  postWorkout: RequestHandler;
}

export interface WorkoutModalProps {
  closeWorkoutModal: () => void;
  selectedDate: Date;
}

export interface SetModalProps {
  toggleSetModal: (exercise: string) => void;
  selectedDate: Date;
  selectedExercise: string;
}

export interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  message: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  exercise_id: number;
  set_id: number;
}

export interface WorkoutsState {
  [exercise: string]: WorkoutSet[];
}

export interface WorkoutStore {
  workouts: WorkoutsState;
  setWorkouts: (workouts: WorkoutsState) => void;
  refreshWorkouts: (unixtime: number, token: string | null) => Promise<void>;
}

export interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

// export interface WrappedComponent {

// }
