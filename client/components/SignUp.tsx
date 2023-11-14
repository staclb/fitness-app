import React, { useState } from 'react'
import { signUp } from '../api/workoutData'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  // const { setToken } = userAuthStore();
  const navigate = useNavigate();

  // event typing
  const handleLogin = async (event: any) => {
    event.preventDefault();
    // console.log(username, password)
    try {
      const response = await signUp(username, password, email);
      // const { data, status } = await login(username, password);
      console.log('response', response)
      if (response.message === 'success') {
        // console.log('Login Successful:', response.token);
        // setToken(responce.token)
        // console.log('hi from if res exists')
        navigate('/');
      } else {
        setErrorMessage(response.error);
        console.log('error', response.error)
      }
      // console.log('response', response)
    } catch (error) {
      console.error('Sign-up error:', error);
      // setErrorMessage('Login failed');
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
        <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="text-red-500" type="submit" onClick={() => {navigate('/');}}>
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default SignUp