import React, { useState } from 'react'
import { login } from '../api/workoutData'
import { userAuthStore } from '../zustand'
import { useNavigate } from 'react-router-dom';
// finish login, signup, sign out for FE
// need to go around eahc function and replace the user_id with the token
// also need to store token in zustand storage
// styling for the new pages
// token expire logic FE and BE => redirect user to login for anotehr token

// button for saving is the same in places => might import
// consider modularizing in general
// theme for tailwind => decide on colors, text, font, etc
// centralize errors on FE, for example when a repinse could be empty/und?
  // possibly on BE too => cover all async func's and actions

// left off => token set to Store, Login is default load but nav bar is on it
  // also fix styling for login

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const { setToken } = userAuthStore();
  const navigate = useNavigate();

  // event typing
  const handleLogin = async (event: any) => {
    event.preventDefault();
    // console.log(username, password)
    try {
      const responce = await login(username, password);
      // const { data, status } = await login(username, password);
      // console.log('response', response)
      if (responce) {
        console.log('Login Successful:', responce.token);
        setToken(responce.token)
        console.log('hi')
        navigate('/Workouts');
      } else {
        setErrorMessage('Login failed');
      }
      // console.log('response', response)
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed');
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
        <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="text-red-500" type="submit">
            <i className="material-icons text-[20px] text-red-500">save</i>
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login