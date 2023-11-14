import React, { ReactElement } from 'react';
// import './style.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './containers/NavBar';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
import Login from './components/Login';
import SignUp from './components/SignUp';
import authCheck from './containers/authCheck';

// setup from docs
function App(): ReactElement {
  // React Node assignment error => React Component vs React Element
  // Comps => Workouts, Progress vs <Workouts/>
  // the fucntion that describes vs teh actual object the component returns
  const AuthCheckedWorkouts = authCheck(Workouts);
  const AuthCheckedProgress = authCheck(Progress);
  const location = useLocation();

  const showNavBar =
    location.pathname !== '/' && location.pathname !== '/SignUp';

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <div className="flex-grow">
        <Routes>
          <Route path="/Workouts" element={<AuthCheckedWorkouts />} />
          <Route path="/Progress" element={<AuthCheckedProgress />} />
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
      {showNavBar && <NavBar />}
    </div>
  );
}
export default App;
