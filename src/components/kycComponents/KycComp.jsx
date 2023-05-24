import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {BASE_URL} from '../../../config';
import UploadKYC from './uploadKYC';
import ShowKYC from './showKYC';


const KycComp = () => {
    const [kycData, setkycData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
          
          try {
            setIsLoading(true);
            const id = localStorage.getItem('user_id').replaceAll('"', '');
            const response = await axios.get(`${BASE_URL}/user_kyc/${id}`);
            setkycData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log();
          }
        };
      
        fetchData();
      }, []);

  return (
    <div className="container">
    {isLoading ? 
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
     : (
      <div className="container">
        {kycData ? 
      <ShowKYC props={kycData} />
      :
      <UploadKYC />
      }
      </div>
    )}
  </div>

  );
};

export default KycComp;
