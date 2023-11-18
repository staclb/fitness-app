import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/workoutData';
import { useAuthStore } from '../zustand';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // messages for FE from backend
  const [errorMessage, setErrorMessage] = useState('');

  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent reload of the page from form canceling
    event.preventDefault();
    try {
      const response = await login(username, password);

      if (response.message === 'success') {
        setToken(response.token);
        navigate('/workouts');
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin}>
        <div className="pb-2">
          <input
            className="rounded"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pb-2">
          <input
            className="rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-around">
          <button className="text-red-500" type="submit">
            <i className="material-icons text-[20px] text-red-500">login</i>
          </button>
          <button
            className="text-red-500"
            type="submit"
            onClick={() => {
              navigate('/signUp');
            }}
          >
            Go to SignUp
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
