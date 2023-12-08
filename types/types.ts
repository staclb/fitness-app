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

export interface EditFormProps {
  workout: {
    setId: number;
    // exerciseID: number;
    // reps: number;
    // weight: number;
  };
  editFormData: {
    reps: string;
    weight: string;
  };
  setEditFormData: (formData: { reps: string; weight: string }) => void;
  handleSaveClick: (setId: number) => Promise<void>;
  handleDeleteSet: (setId: number) => Promise<void>;
}

export interface YoutubeModalProps {
  videoId: string | null;
  onClose: () => void;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  exerciseId: number;
  setId: number;
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

export interface Exercises {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export interface ExercisesState {
  exercises: Exercises[]; // Define exercises as an array of Exercise objects
}

export interface ExercisesStore {
  exercises: ExercisesState;
  setExercises: (exercises: ExercisesState) => void;
}
