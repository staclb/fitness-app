import React, { useState } from 'react'
import { login } from '../api/workoutData'
import { userAuthStore } from '../zustand'
import { useNavigate } from 'react-router-dom';

// button for saving is the same in places => might import
// consider modularizing in general
// theme for tailwind => decide on colors, text, font, etc
// centralize errors on FE, for example when a repinse could be empty/und?
  // possibly on BE too => cover all async func's and actions

// signout btton on top left => maybe a side bar with three lines 

// look into build problems

// error boundaries in React to handle errors in UI components

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const { setToken } = userAuthStore();
  const navigate = useNavigate();

  // fix any event typing
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await login(username, password);

      // login bug?

      if (response) {
        console.log('Login Successful:', response);
        setToken(response.token)
        navigate('/Workouts');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed');
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleLogin}>
        <div>
        <label className="text-red-500" htmlFor="username">Username:</label>
          <input
            className="text-red-500"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
        <label className="text-red-500" htmlFor="password">Password:</label>
          <input
            className="text-red-500"
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="text-red-500" type="submit">
            <i className="material-icons text-[20px] text-red-500">save</i>
        </button>
        <button className="text-red-500" type="submit" onClick={() => {navigate('/SignUp');}}>
          SignUp
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login