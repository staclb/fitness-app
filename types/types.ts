import type { RequestHandler } from 'express';


export interface ServerError {
  err: '400'
}

// export interface workoutController {
//   postWorkout: RequestHandler
// }

export interface WorkoutModalProps {
  closeWorkoutModal: () => void
}