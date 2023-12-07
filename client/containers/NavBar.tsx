import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Logout from '../components/Logout';
import ConfirmationModal from '../modals/ConfirmationModal';
import { youtubeAuth } from '../api/youtubeData';
import { useAuthStore } from '../zustand';

const NavBar = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    navigate('/');
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleYoutubeAuth = async () => {
    const response = await youtubeAuth(token);
    console.log('response: ', response);
  };

  return (
    <div className="flex justify-around items-end bg-gray-500 text-white font-bold py-4 px-4 rounded sticky bottom-0 z-10">
      <button
        type="button"
        className="material-icons text-[30px] hover:bg-gray-400 rounded"
        onClick={handleYoutubeAuth}
      >
        play_circle
      </button>
      <button
        type="button"
        className="material-icons text-[30px] hover:bg-gray-400 rounded"
        onClick={() => {
          navigate('/workouts');
        }}
      >
        fitness_center
      </button>
      <button
        type="button"
        className="material-icons text-[30px] hover:bg-gray-400 rounded"
        onClick={() => {
          navigate('/progress');
        }}
      >
        signal_cellular_alt
      </button>
      <button
        type="button"
        className="material-icons text-[30px] hover:bg-gray-400 rounded"
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
