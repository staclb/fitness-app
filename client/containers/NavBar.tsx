import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {navigate('/Workouts');}}>Workouts</button>
      <button onClick={() => {navigate('/Progress');}}>Progress</button>
    </div>
  );
};

export default NavBar;