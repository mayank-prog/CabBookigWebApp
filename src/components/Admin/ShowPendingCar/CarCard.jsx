import React from 'react';


import { ImCross,  } from "react-icons/Im";
import {MdDoneOutline} from "react-icons/md";

const CarCard = ({ car, onApprove }) => {
  const { _id, carNumber, carName, model ,insuranceNumber,chassisNumber,permitNumber ,fuelType,numberOfSeats} = car;

  const handleApproveClick = (status) => {
    onApprove(status, _id); 
  };

  return (
    <div className="card m-2">
    <div className="card-body">
        <div className='row'>
        <h6>{carName} ({model})</h6>
         <div className='col-4' >
            <span>Car Number: {carNumber}</span><br/>
            <span>Insurance Number: {insuranceNumber}</span><br/>
            <span>Permit Number: {permitNumber}</span>
         </div>
         <div className='col-4'>
            <span>Chassis Number: {chassisNumber}</span><br/>
            <span>Fuel Type: {fuelType}</span><br/>
            <span>Number Of Seats: {numberOfSeats}</span>
         </div>
         <div className='col-4'>
        <div className='row'>
         <div className='col-4' >
         <ImCross size="30px" style={{ color: 'red' ,cursor: "pointer" }} onClick={()=>handleApproveClick("Rejected")}/>
         </div>
         <div className='col-4' >
         <MdDoneOutline size="30px" style={{ color: "green", cursor: "pointer" }} onClick={()=>handleApproveClick("Approved")}/>
         </div>
        </div>
          
          
         </div>
        </div>
      
      </div>
    </div>
  );
};

export default CarCard;
