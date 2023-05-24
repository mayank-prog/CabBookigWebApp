import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import SignupPage from './signUp';
import LoginPage from './login';

const LoginSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);
 
  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
         <Card.Title className="text-center">Welcome to the TaxiBookig!</Card.Title>
          <div className="row text-center border">
              <div className="col-5">
                   <h5 className="" onClick={toggleSignup}>Login</h5>
              </div>
              <div className="col-2">
                   <h5>|</h5>
              </div>
              <div className="col-5">
                    <h5 variant="link" onClick={toggleSignup}>Signup</h5>
              </div>

          </div>

          {!isSignup ? 
             <LoginPage/>
          : 
            <SignupPage/>
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginSignupPage;
