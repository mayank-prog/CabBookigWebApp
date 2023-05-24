import React from 'react';
import { Card } from 'react-bootstrap';

const CarCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'info';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="d-flex justify-content-center m-2" style={{ height: 'auto' }}>
     <Card style={{ width: '60%' }}>
      <Card.Body>
       <Card.Title className="">{data.carName} ({data.model})</Card.Title>
      <div className="card-body">
        <div className="row">
          
          <div className="col-6">
            <p className="card-text">Car Number: {data.carNumber}</p>
            <p className="card-text">Insurance Number: {data.insuranceNumber}</p>
            <p className="card-text">Chassis Number: {data.chassisNumber}</p>
          </div>
          <div className="col-6">
            <p className="card-text">Permit Number: {data.permitNumber}</p>
            <p className="card-text">Fuel Type: {data.fuelType}</p>
            <p className="card-text">Number of Seats: {data.numberOfSeats}</p>
          </div>
        </div>        
        <hr />
        <h6 className="card-subtitle mb-2 text-muted">Status</h6>
        <p className={`card-text text-${getStatusColor(data.status)}`}>{data.status}</p>
      </div>

    </Card.Body>
    </Card> 
    </div>
  );
};

export default CarCard;
