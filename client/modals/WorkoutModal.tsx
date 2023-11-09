import React from 'react';
import { WorkoutModalProps } from '../../types/types';
import { postWorkout, fetchWorkoutsByDay } from '../api/workoutData';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ closeWorkoutModal, selectedDate, setWorkouts } ) => {

  // type for event set to any - need to look into it
  const handlePostWorkout = async (event: any) => {
    event.preventDefault();

    const user_id = 1;
    const unixtime = selectedDate.getTime();

    const workoutData = {
      name: event.target.name.value,
      weight: Number(event.target.weight.value),
      reps: Number(event.target.reps.value),
      user_id: user_id,
      unixtime: unixtime
    };

    try {
      const response = await postWorkout(workoutData);
      // need to do seomthing with data after => update workouts => might need context
      const updatedWorkouts = await fetchWorkoutsByDay(unixtime, user_id);
      setWorkouts(updatedWorkouts);
      closeWorkoutModal();
    } catch (error) {
      console.log('Error posting workout data');
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => closeWorkoutModal()}>X</button>
      </div>
      <div className='flex flex-col'>
        <form onSubmit={handlePostWorkout}>
          <label>
            Workout:
            <input type="text" name="name" />
          </label>
          <label>
            Weight:
            <input type="number" name="weight" />
          </label>
          <label>
            Reps:
            <input type="number" name="reps" />
          </label>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutModal;
