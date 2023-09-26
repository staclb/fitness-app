import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkoutModal from '../modals/WorkoutModal';

// import './Sample.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Workouts = () => {
  console.log('hi from workouts');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, onChange] = useState<Value>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  console.log('value:', value);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold ">
        Current Date
      </button>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
        +
      </button>

      <div className="calendar-container">
        {/* <main className="Sample__container__content"> */}
        <Calendar onChange={onChange} showWeekNumbers value={value} />
        {/* </main> */}
      </div>
      {modalOpen && <WorkoutModal closeModal={closeModal}/>}
    </div>
  );

};

export default Workouts;