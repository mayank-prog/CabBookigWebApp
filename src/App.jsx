import React, {useState, useEffect } from 'react';
import {  Routes, Route, Navigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navBar/navbar';
import LoginSignupPage from './components/loginAnsSignUp/loginSignUpRout';
// import { useNavigate } from 'react-router-dom';
import Home from './components/MainApp/home';
import KycComp from './components/kycComponents/KycComp';
import Car from './components/MainApp/Car';
import Driver from './components/MainApp/Driver';
import Admin from './components/Admin/admin';
// import styled from 'styled-components';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check for auth token when component mounts
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
    {isLoggedIn ? (
    <div className="app">
      <div className="n">
       </div>
        <Routes> 
          <Route exact path="/Login" element={<LoginSignupPage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="*" element={ <Navigate to="/Login" /> }/>
        </Routes>
    </div> 
      ) : (
    <div className="app">
        <div className="n">       
        <Navbar/> 
        </div>
        <Routes> 
          <Route exact path="/home" element={<Home/>} />
          <Route path="/cars"  element={<Car />} />
          <Route path="/drivers"  element={<Driver />} />
          <Route path="/kyc"  element={<KycComp />} />
          <Route path="/admin" element={<Home/>} />
          <Route path="*" element={ <Navigate to="/home" /> }/>
        </Routes>
    </div>
  )}

   </React.Fragment>
  )
}
export default App

