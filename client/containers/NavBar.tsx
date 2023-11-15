import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Logout from '../components/Logout';
import ConfirmationModal from '../modals/ConfirmationModal';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    navigate('/');
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

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
      <button
        type="button"
        className="material-icons text-[30px]"
        onClick={() => setIsLogoutModalOpen(true)} // Open the logout confirmation modal
      >
        logout
      </button>
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        message="Are you sure you want to log out?"
      />
    </div>
  );
};

export default NavBar;
