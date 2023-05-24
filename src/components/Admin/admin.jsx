import React, { useState, useEffect } from 'react';

import ShowCarPending from './ShowPendingCar/showCarPending'
import ShowKYCPending from './ShowPendingKYC/showPendingKYC'

function Admin() { 
    const [select, setSelect] = useState(false); 

    const toggleSignup = () => {
        setSelect(!select);
      };

  return (
    <div className="container">
      <div className="text-center">
         <h2>We are in Admin Panel</h2>
        </div>
    <div className="text-centar m-2">
     <button className=" btn btn-info m-2" onClick={toggleSignup} > {select ? "Show Pending Cars" : "Show Pending KYC"}</button>
    </div>
     {!select ? 
      <ShowCarPending/>
    : 
      <ShowKYCPending/>
    }
    </div>
  );
}

export default Admin;
