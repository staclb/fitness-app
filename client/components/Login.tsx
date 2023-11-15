import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/workoutData';
import { userAuthStore } from '../zustand';

// button for saving is the same in places => might import
// consider modularizing in general
// theme for tailwind => decide on colors, text, font, etc
// centralize errors on FE, for example when a repinse could be empty/und?
// possibly on BE too => cover all async func's and actions

// look into build problems

// error boundaries in React to handle errors in UI components

// are you sure for when deleting a wholeworkout and sets

// change text colors, add spacing between input boxes, get rid of labels
// do the same on workouts, add default value => 0 if none entered

// make add a wk button sticky => its reliant on calendar modal loading? and next to workouts when there are some
// consider what to do with date at the top, should prob make it sticky and accessible on workotus and progress

// what about workout modal, is it needed?

// resuable buttons => need to modularize then import them?
// cancel button, save button

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // messages for FE from backend
  const [errorMessage, setErrorMessage] = useState('');

  const { setToken } = userAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent reload of the page from form canceling
    event.preventDefault();
    try {
      const response = await login(username, password);

      if (response.message === 'success') {
        setToken(response.token);
        navigate('/Workouts');
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
              navigate('/SignUp');
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
