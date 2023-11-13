import React, { type ReactElement } from 'react';
// import './style.css'
import NavBar from './containers/NavBar';
import { Routes, Route } from 'react-router-dom';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
import Login from './components/Login'

// setup from docs
function App (): ReactElement {
  return (
    <div className='flex flex-col h-screen bg-slate-50'>
      <div className='flex-grow'>
        {/* <Routes>
          <Route path='/' element={<Login />}></Route>
        </Routes> */}
        <Routes>
          <Route path='/Workouts' element={<Workouts />}></Route>
          <Route path='/Progress' element={<Progress />}></Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </div>
      <NavBar />
    </div>
  );
}
export default App;
