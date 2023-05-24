import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {BASE_URL} from '../../../config';


import DriverCard from '../utils/driverCard';
import AddDriverModal from '../utils/addingDriver';




const Driver = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          const id = localStorage.getItem('user_id').replaceAll('"', '');
          try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/driver/all/${id}`);
            setData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log('Internal Server Error', error);
          }
        };
      
        fetchData();
      }, []);

  return (
    <div className="container">
      {isLoading ?
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
        <RiseLoader color="#36d7b7" loading={isLoading} />
      </div>
      : 
      <div>
        <button className="btn btn-success" onClick={handleShowModal}>
            Add Driver
        </button>
        <AddDriverModal show={showModal} handleClose={handleCloseModal} />
       {data.map((car) => (
         <DriverCard key={car._id} data={car} />
        ))}
      </div>
    }
  </div>
  );
};

export default Driver;
