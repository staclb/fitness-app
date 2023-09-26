import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// import './Sample.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Workouts = () => {
  console.log('hi from workouts');

  const [selectedDate, setSelectedDate] = useState(new Date());
  // const invalidValue: string = selectedDate;
  const [value, onChange] = useState<Value>(new Date());
  // const [date, setDate] = useState<Value>(new Date());
  console.log('value:', value);
  return (
    <div className='flex flex-col'>
      <button className="bg-blue-500 text-white font-bold ">
        {/* {value} */}
        Current Date
      </button>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
        +
      </button>

      <div className="calendar-container">
        {/* <main className="Sample__container__content"> */}
        <Calendar onChange={onChange} showWeekNumbers value={value} />
        {/* </main> */}
      </div>
    </div>
  );

};

export default Workouts;