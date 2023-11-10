import React from 'react';
import { SetModalProps } from '../../types/types';
import { postWorkout } from '../api/workoutData';
import { useWorkoutStore } from '../zustand';

const SetModal: React.FC<SetModalProps> = ({ toggleSetModal, selectedDate, selectedExercise }) => {
  const { refreshWorkouts } = useWorkoutStore();
  const handlePostSet = async (event: any) => {
    event.preventDefault();
    const user_id = 1;
    const unixtime = selectedDate.getTime();

    const workoutData = {
      weight: Number(event.target.weight.value),
      reps: Number(event.target.reps.value),
      user_id: user_id,
      unixtime: unixtime,
      name: selectedExercise
    };

    try {
      await postWorkout(workoutData);
      await refreshWorkouts(unixtime, user_id);
      toggleSetModal(selectedExercise);
    } catch (error) {
      console.log('Error posting workout data');
    }
  };
  return (
    <div>
      <div className='flex flex-col'>
        <form onSubmit={handlePostSet}>
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

export default SetModal;