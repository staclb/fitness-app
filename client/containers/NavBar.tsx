import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-around items-end bg-slate-300 text-white font-bold py-4 px-4 rounded'>
      <button className="material-icons text-[30px]" onClick={() => {navigate('/Workouts');}}>fitness_center</button>
      <button className="material-icons text-[30px]" onClick={() => {navigate('/Progress');}}>signal_cellular_alt</button>
    </div>
  );
};

export default NavBar;