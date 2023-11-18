import React, { useState } from 'react';
import { WorkoutModalProps } from '../../types/types';
import { postWorkout } from '../api/workoutData';
import { useWorkoutStore, useAuthStore } from '../zustand';

const WorkoutModal: React.FC<WorkoutModalProps> = ({
  closeWorkoutModal,
  selectedDate,
}) => {
  const { refreshWorkouts } = useWorkoutStore();
  const { token } = useAuthStore();
  // added states due to event typing
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [name, setName] = useState('');

  const handlePostWorkout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unixtime = selectedDate.getTime();

    const workoutData = {
      name,
      weight: Number(weight),
      reps: Number(reps),
      unixtime,
    };

    try {
      await postWorkout(workoutData, token);
      await refreshWorkouts(unixtime, token);
      closeWorkoutModal();
    } catch (error) {
      console.log('Error posting workout data');
    }
  };
  return (
    <div>
      <div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handlePostWorkout}>
          <input
            className="w-24 h-7 rounded"
            placeholder="Exercise"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-24 h-7 rounded"
            placeholder="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            className="w-24 h-7 rounded"
            placeholder="Reps"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <div className="flex justify-around w-24 h-7 rounded">
            <button type="submit">
              <i className="material-icons text-[20px] text-red-500">save</i>
            </button>
            <button type="button" onClick={() => closeWorkoutModal()}>
              <i className="material-icons text-[20px] text-red-500">cancel</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutModal;
