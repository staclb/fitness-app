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
  // using context can help avoid this line below
  // setWorkouts: React.Dispatch<React.SetStateAction<{ [exercise: string]: Array<{ reps: number; weight: number; exercise_id: number; set_id: number }> }>>;
}

export interface SetModalProps {
  toggleSetModal: (exercise: string) => void;
  selectedDate: Date;
  // setWorkouts: React.Dispatch<React.SetStateAction<{ [exercise: string]: Array<{ reps: number; weight: number; exercise_id: number; set_id: number }> }>>;
  // set_id: number
  selectedExercise: string;
}

// export interface Workouts {
//   // id: number;
//   reps: number;
//   weight: number;
// }

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
