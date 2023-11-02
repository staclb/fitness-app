import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';
import { v4 as uuidv4 } from 'uuid';
import { fetchWorkoutsByDay } from '../api/workoutData';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
// type date = string | null;

const Workouts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, onChange] = useState<Value>(new Date());
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [workouts, setWorkouts] = useState<{ [exercise: string]: Array<{ reps: number; weight: number }> }>({});
  const [selectedExercise, setSelectedExercise] = useState('');

  const openWorkoutModal = () => {
    setOpenWorkout(true);
  };

  const closeWorkoutModal = () => {
    setOpenWorkout(false);
  };

  const openCalendarModal = () => {
    setOpenCalendar(true);
  };

  const closeCalendarModal = (date: Date) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };

  const currentDate = (date: Date) => {
    const timestamp = new Date().getTime();
    const todaysDate = date.getMonth() + 1 + '/' + date.getDate();
    return todaysDate;
  };

  const handleExerciseClick = (exercise: string) => {
    if (exercise === selectedExercise) {
      setSelectedExercise('');
    } else {
      setSelectedExercise(exercise);
    }
  };

  // for fetching workout data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unixtime = selectedDate.getTime();
        const user_id = 1;
        const data = await fetchWorkoutsByDay(unixtime, user_id);
        setWorkouts(data);
      } catch (error) {
        console.log('Error fetching workouts by day data');
      }
    };
    fetchData();
  }, [selectedDate]);

  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold " onClick={openCalendarModal}>
        {currentDate(selectedDate)}
      </button>
      <div>
        {Object.keys(workouts).map((exercise: string) => (
          <div key={uuidv4()}>
            <h2 onClick={() => handleExerciseClick(exercise)}>{exercise}</h2>
            {selectedExercise === exercise && (
              <div>
                {workouts[exercise].map((workout) => (
                  <div key={uuidv4()}>
                    <p>Reps: {workout.reps}</p>
                    <p>Weight: {workout.weight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={openWorkoutModal}>
        +
      </button>
      {openCalendar && <Calendar onChange={onChange} defaultValue={selectedDate} onClickDay={closeCalendarModal}/>}

      {openWorkout && <WorkoutModal closeWorkoutModal={closeWorkoutModal} selectedDate={selectedDate} setWorkouts={setWorkouts}/>}

    </div>
  );
};
export default Workouts;
