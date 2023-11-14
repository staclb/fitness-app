import React, { useState } from 'react';
import { WorkoutModalProps } from '../../types/types';
import { postWorkout } from '../api/workoutData';
import { useWorkoutStore, userAuthStore } from '../zustand';

const WorkoutModal: React.FC<WorkoutModalProps> = ({
  closeWorkoutModal,
  selectedDate,
}) => {
  const { refreshWorkouts } = useWorkoutStore();
  const { token } = userAuthStore();
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
      <div>
        <button type="button" onClick={() => closeWorkoutModal()}>
          <i className="material-icons text-[20px] text-red-500">cancel</i>
        </button>
      </div>
      <div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handlePostWorkout}>
          <label htmlFor="name" className="text-red-500">
            Workout:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <button type="submit">
            <i className="material-icons text-[20px] text-red-500">save</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutModal;
