import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/workoutData';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // messages for FE from backend
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signUp(username, password, email);
      if (response.message === 'success') {
        navigate('/');
      } else {
        setErrorMessage(response.error);
        console.log('error', response.error);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin}>
        <div className="pb-2">
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pb-2">
          <input
            placeholder="Email"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="pb-2">
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-around">
          <button className="text-red-500" type="submit">
            <i className="material-icons text-[20px] text-red-500">save</i>
          </button>
          <button
            className="text-red-500"
            type="submit"
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Login
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
