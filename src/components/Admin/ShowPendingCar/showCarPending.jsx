import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {BASE_URL} from '../../../../config';
import CarsPending from './carsPending';

function ShowCarPending() {
    const [carsData, setcarsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  

    useEffect(() => {
        const fetchData = async () => {  
          try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/admin_request/allCarPanding`);
            setcarsData(response.data)
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, []);
     
const handleApprove = async (status, _id) => { 
        try {
          const response = await axios.post(`${BASE_URL}/admin_request/car_status/${_id}`, {
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
         <h2>Show Pending Cars</h2>
        </div>
        {carsData.map((user,index) => (
            <CarsPending key={index} user={user} onApprove={handleApprove} />
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
