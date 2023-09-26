import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-around items-end border-4 border-indigo-500'>
      <button onClick={() => {navigate('/Workouts');}}>Workouts</button>
      <button onClick={() => {navigate('/Progress');}}>Progress</button>
    </div>
  );
};

export default NavBar;