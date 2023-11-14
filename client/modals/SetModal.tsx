import React from 'react';
import { SetModalProps } from '../../types/types';
import { postWorkout } from '../api/workoutData';
import { useWorkoutStore, userAuthStore } from '../zustand';

const SetModal = ({
  toggleSetModal,
  selectedDate,
  selectedExercise,
}: SetModalProps) => {
  const { refreshWorkouts } = useWorkoutStore();
  const { token } = userAuthStore();
  const handlePostSet = async (event: any) => {
    event.preventDefault();
    // const user_id = 1;
    const unixtime = selectedDate.getTime();

    const workoutData = {
      weight: Number(event.target.weight.value),
      reps: Number(event.target.reps.value),
      // user_id,
      unixtime,
      name: selectedExercise,
    };

    try {
      await postWorkout(workoutData, token);
      await refreshWorkouts(unixtime, token);
      toggleSetModal(selectedExercise);
    } catch (error) {
      console.log('Error posting workout data');
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => toggleSetModal('')}>
          <i className="material-icons text-[20px] text-red-500">cancel</i>
        </button>
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handlePostSet}>
          <label className="text-red-500">
            Weight:
            <input type="number" name="weight" />
          </label>
          <label className="text-red-500">
            Reps:
            <input type="number" name="reps" />
          </label>
          <button className="text-red-500" type="submit">
            <i className="material-icons text-[20px] text-red-500">save</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetModal;
