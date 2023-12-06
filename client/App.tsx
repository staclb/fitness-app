import React, { ReactElement } from 'react';
// import './style.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './containers/NavBar';
import Workouts from './containers/Workouts';
import Progress from './components/Progress';
import Login from './components/Login';
import SignUp from './components/SignUp';
import authCheck from './containers/authCheck';
import Search from './components/Search';
import Success from './components/Success';

// setup from docs
function App(): ReactElement {
  // React Node assignment error => React Component vs React Element
  // Comps => Workouts, Progress vs <Workouts/>
  // the fucntion that describes vs the actual object the component returns
  const AuthCheckedWorkouts = authCheck(Workouts);
  const AuthCheckedProgress = authCheck(Progress);
  const location = useLocation();

  const showNavBar =
    location.pathname !== '/' && location.pathname !== '/signUp';

  return (
    // changed h-screen to min, to account fopr content overflow
    <div className="flex flex-col min-h-screen bg-slate-950">
      <div className="flex-grow">
        <Routes>
          <Route path="/workouts" element={<AuthCheckedWorkouts />} />
          <Route path="/progress" element={<AuthCheckedProgress />} />
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
      {showNavBar && <NavBar />}
    </div>
  );
}
export default App;
