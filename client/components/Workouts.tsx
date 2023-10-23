import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';

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

  const getWorkouts = async () => {
    try {
      const url = '/api/workout/get';
      const res = await fetch (url);
      const data = await res.json();
    } catch (error) {
      console.log('Error fetching logs:', error);
    }
  }

  const openWorkoutModal = () => {
    setOpenWorkout(true);
  };

  const closeWorkoutModal = () => {
    setOpenWorkout(false);
  };

  const openCalendarModal = () => {
    console.log('open calendar');
    setOpenCalendar(true);
  };

  const closeCalendarModal = (date: Date) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };

  const currentDate = (date: Date) => {
    // const date = new Date();
    console.log(date);
    const timestamp = new Date().getTime();
    console.log('yo1', timestamp);
    console.log('yo2', new Date(timestamp));
    const todaysDate = date.getMonth() + 1 + '/' + date.getDate();
    return todaysDate;
  };

  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold " onClick={openCalendarModal}>
        {currentDate(selectedDate)}
      </button>
      {workouts}
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