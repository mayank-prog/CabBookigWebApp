import React, { useState, useEffect } from "react";
import axios from 'axios';

import CarCard from './CarCard';

function CarsPending({user , onApprove}) {
  const { name, email, phone, cars } = user;

  const handleApprove = (status, _id) => { 
    onApprove(status, _id);
  };


  return (
    <div className="container m-2">
      <div className="card">
      <div className="card-body">
        <h6 className="text-dark">{name}({phone})</h6>
        <span className="text-info">{email}</span>
          {cars.map((car) => (
            <CarCard key={car._id} car={car} onApprove={handleApprove} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarsPending;
