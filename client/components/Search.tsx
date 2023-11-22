import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkoutStore, useAuthStore, useExerciseStore } from '../zustand';
import { fetchExerices, postWorkout } from '../api/workoutData';
import { Exercises } from '../../types/types';

const Search = () => {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercises[]>([]);

  const navigate = useNavigate();
  const { token } = useAuthStore();
  const location = useLocation();
  const { refreshWorkouts } = useWorkoutStore();
  // const { exercises, setExercises } = useExerciseStore();

  const handleCancelSearch = () => {
    // what does navigate(-1) do
    navigate('/workouts');
  };

  const handleSearch = async (
    exerciseName: string,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // console.log('name: ', name);
    // console.log(name)
    try {
      const response = await fetchExerices(exerciseName, token);
      // console.log('response: ', response.exercises);
      if (response) {
        setExercises(response.exercises);
      }
    } catch (error) {
      console.log('Error searching for exercise', error);
    }
  };

  const handlePostWorkout = async (exerciseName: string) => {
    // console.log('hi');
    // console.log(name)
    const { selectedDate } = location.state;
    const unixtime = selectedDate.getTime();

    const workoutData = {
      name: exerciseName,
      weight: 0,
      reps: 0,
      unixtime,
    };
    try {
      const response = await postWorkout(workoutData, token);
      await refreshWorkouts(unixtime, token);
      // have to add selected  exercise and open the set edit modal on that set, so possibly the set id
      // console.log('res in handle post workout in search: ', response);
      // setEditingSetId(response)
      navigate('/workouts', {
        state: { newSetId: response, exerciseName },
      });
    } catch (error) {
      console.log('Error posting workout data');
    }
  };

  return (
    <div className="space-x-10">
      <button className="text-white" type="button" onClick={handleCancelSearch}>
        Go back
      </button>
      <form onSubmit={(event) => handleSearch(name, event)}>
        <div className="pb-2">
          <input
            className="rounded"
            placeholder="Exercise"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      <div>
        {exercises.map((exercise: Exercises) => (
          <button
            type="button"
            key={exercise.name}
            className="text-white flex flex-column pb-3"
            onClick={() => handlePostWorkout(exercise.name)}
          >
            {exercise.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
