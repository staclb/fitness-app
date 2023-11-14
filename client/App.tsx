import React, { type ReactElement } from 'react';
// import './style.css'
import NavBar from './containers/NavBar';
import { Routes, Route } from 'react-router-dom';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
import Login from './components/Login'
import SignUp from './components/SignUp';
import authCheck from './containers/authCheck'

// setup from docs
function App (): ReactElement {

  // React Node assignment error => React Component vs React Element
    // Comps => Workouts, Progress vs <Workouts/>
    // the fucntion that describes vs teh actual object the component returns
  const AuthCheckedWorkouts = authCheck(Workouts);
  const AuthCheckedProgress = authCheck(Progress);

  return (
    <div className='flex flex-col h-screen bg-slate-50'>
      <div className='flex-grow'>
        {/* <Routes>
          <Route path='/' element={<Login />}></Route>
        </Routes> */}
        <Routes>
          <Route path='/Workouts' element={<AuthCheckedWorkouts />} />
          <Route path='/Progress' element={<AuthCheckedProgress />} />
          <Route path='/' element={<Login />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
        </Routes>
      </div>
      <NavBar />
    </div>
  );
}
export default App;
