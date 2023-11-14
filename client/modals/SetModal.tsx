import React, { useState } from 'react';
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
  // added states for weight, reps because of event object typing
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const handlePostSet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unixtime = selectedDate.getTime();

    const workoutData = {
      weight: Number(weight),
      reps: Number(reps),
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
        <button type="button" onClick={() => toggleSetModal('')}>
          <i className="material-icons text-[20px] text-red-500">cancel</i>
        </button>
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handlePostSet}>
          <label htmlFor="weight" className="text-red-500">
            Weight:
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <label htmlFor="reps" className="text-red-500">
            Reps:
            <input
              type="number"
              name="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
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
