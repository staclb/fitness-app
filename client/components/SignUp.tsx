import React, { useState } from 'react'
import { signUp } from '../api/workoutData'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // fix any event typing
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await signUp(username, password, email);
      if (response.message === 'success') {
        navigate('/');
      } else {
        setErrorMessage(response.error);
        console.log('error', response.error)
      }
    } catch (error) {
      console.error('Sign-up error:', error);
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
        <label className="text-red-500" htmlFor="email">Email:</label>
          <input
            className="text-red-500"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="text-red-500" type="submit" onClick={() => {navigate('/');}}>
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default SignUp