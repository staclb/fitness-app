import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';
import { Workouts } from '../../types/types';

// import './Sample.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// type date = string | null;

const Workouts = () => {
  // console.log('hi from workouts');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, onChange] = useState<Value>(new Date());
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  // const fetchWorkoutsByDay = async (unixtime: number) => {
  //   try {
  //     const user_id = 1;

  //     console.log('UX', unixtime)
  //     console.log('id', user_id)
  //     const responce = await fetch(`/api/workout/getByDay?unixtime=${unixtime}&user_id=${user_id}`);

  //     const data: Workouts[] = await responce.json();

  //     console.log('data', data);

  //     setWorkouts(data);
  //   } catch (error) {
  //     console.log('Error fetching workouts by day');
  //   }
  // };

  const openWorkoutModal = () => {
    setOpenWorkout(true);
  };

  const closeWorkoutModal = () => {
    setOpenWorkout(false);
  };

  const openCalendarModal = () => {
    // console.log('open calendar');
    setOpenCalendar(true);
  };

  const closeCalendarModal = (date: Date) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };

  const currentDate = (date: Date) => {
    const timestamp = new Date().getTime();
    console.log('yo1', timestamp);
    const todaysDate = date.getMonth() + 1 + '/' + date.getDate();
    return todaysDate;
  };

  useEffect(() => {
    const unixtime = selectedDate.getTime();
    fetchWorkoutsByDay(unixtime);
  }, [selectedDate]);

  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold " onClick={openCalendarModal}>
        {currentDate(selectedDate)}
      </button>
      {/* {workouts.map((workout) => (
        <div key={workout.id} />
      ))} */}
      {/* {workouts} */}
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={openWorkoutModal}>
        +
      </button>
      {openCalendar && <Calendar onChange={onChange} defaultValue={selectedDate} onClickDay={closeCalendarModal}/>}

      {openWorkout && <WorkoutModal closeWorkoutModal={closeWorkoutModal}/>}
    </div>
  );

};

export default Workouts;

// onDateClick={closeCalendarModal}
// showWeekNumbers value={value}