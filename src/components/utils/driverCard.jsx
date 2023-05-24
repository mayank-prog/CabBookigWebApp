import React from 'react';
import { Card } from 'react-bootstrap';

const DriverCard = ({ data }) => {

  return (
    <div className="d-flex justify-content-center m-2" style={{ height: 'auto' }}>
     <Card style={{ width: '60%' }}>
      <Card.Body>
       <Card.Title className="">{data.name}</Card.Title>
        <div className="card-body">
             <p className="card-text">License Number: {data.license_Number}</p>
             <p className="card-text">phone Number: {data.phone}</p>
        </div>  
    </Card.Body>
    </Card> 
    </div>
  );
};

export default DriverCard;
