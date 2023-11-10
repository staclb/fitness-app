import React from 'react';
import { WorkoutModalProps } from '../../types/types';
import { postWorkout } from '../api/workoutData';
import { useWorkoutStore } from '../zustand';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ closeWorkoutModal, selectedDate } ) => {
  const { refreshWorkouts } = useWorkoutStore();
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
      await postWorkout(workoutData);
      await refreshWorkouts(unixtime, user_id);
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
