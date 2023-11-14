import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-around items-end bg-slate-300 text-white font-bold py-4 px-4 rounded">
      <button
        type="button"
        className="material-icons text-[30px]"
        onClick={() => {
          navigate('/Workouts');
        }}
      >
        fitness_center
      </button>
      <button
        type="button"
        className="material-icons text-[30px]"
        onClick={() => {
          navigate('/Progress');
        }}
      >
        signal_cellular_alt
      </button>
      <Logout />
    </div>
  );
};

export default NavBar;
