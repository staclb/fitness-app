import React, { type ReactElement } from 'react';
// import './style.css'
import NavBar from './containers/NavBar';
import { Routes, Route } from 'react-router-dom';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
// import { WorkoutProvider } from './WorkoutContext';

// setup from docs
function App (): ReactElement {
  return (
    // <WorkoutProvider>
    <div className='flex flex-col h-screen bg-neutral-400'>
      <div className='flex-grow'>
        <Routes>
          <Route path='/Workouts' element={<Workouts />}></Route>
          <Route path='/Progress' element={<Progress />}></Route>
        </Routes>
      </div>
      <NavBar />
    </div>
    // </WorkoutProvider>
  );
}
export default App;
