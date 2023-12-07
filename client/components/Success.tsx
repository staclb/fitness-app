import React from 'react';
import { useNavigate } from 'react-router';

const Success = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/workouts');
  };
  return (
    <div className="w-24 h-7 text-[15px] text-red-500 px-6">
      <button type="button" onClick={handleSuccess}>
        Success
      </button>
    </div>
  );
};

export default Success;
