import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../zustand';

const Success = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  useEffect(() => {
    // built in JS object, and method to extarct desired part of the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setToken(token); // Update the Zustand store with the new token
      navigate('/workouts');
    } else {
      navigate('/');
    }
  }, [navigate, setToken]);

  return <div>Loading...</div>;
};

export default Success;
