import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {BASE_URL} from '../../../../config';
import KYCPending from './kycPending'

function ShowCarPending() {
    const [kycData, setkycData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  

    useEffect(() => {
        const fetchData = async () => {  
          try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/admin_request/allKYCPanding`);
            setkycData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, []);

  const handleApprove = async (status, _id) => { 
        try {
          const response = await axios.post(`${BASE_URL}/admin_request/KYC_status/${_id}`, {
              status: status
              });
          window.location.reload(false);
        } catch (err) {
          console.log(err)
        } 
  };   

  return (
    <div className="container">

    {!isLoading ? 
      <div className="car-cards">
      <div className="text-center">
          <h2>Show Pending KYC</h2>
         </div>
         {kycData.map((user,index) => (
             <KYCPending key={index} user={user} onApprove={handleApprove} />
         ))}
      </div>
    :
    <div className="container">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          <RiseLoader color="#36d7b7" loading={isLoading} />
        </div>
    </div>

    }

    </div>
  );
}

export default ShowCarPending;
