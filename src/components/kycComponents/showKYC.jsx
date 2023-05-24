import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const ShowKYC= (props) => {
  const {Addhar, Pan, account_no, status, upi_id} =  props.props;
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
    <div className="d-flex justify-content-center " style={{ height: '70vh' }}>
     <Card style={{ width: '600px' }}>
      <Card.Body>
       <Card.Title className="text-center">KYC (Know Your Customer).</Card.Title>
       <div>
       <h5 className="card-title">User Information</h5>
        {/* Check if account_no exists before accessing */}
        {account_no && <p className="card-text">Account No: {account_no}</p>}
        {upi_id && <p className="card-text">UPI ID: {upi_id}</p>}
        {status && <p className={`card-text text-${getStatusColor(status)}`}>Status: {status}</p>}
        <hr />
        <h6 className="card-subtitle mb-2 text-muted">Aadhaar Information</h6>
        {/* Check if Addhar exists before accessing */}
        <div className="row">
        <div className="col-6">
        {Addhar && Addhar.addhar_no && (
          <p className="card-text">Aadhaar No: {Addhar.addhar_no}</p>
        )}
        </div>
        <div className="col-6">
        {Addhar && Addhar.addhar_no && (
          <img src={Addhar.addhar_url} alt="Aadhaar No" className="img-fluid" style={{ maxWidth: '80px' }} />
        )}
        </div>
        </div>
        {/* Aadhaar URL: {data.Addhar && data.Addhar.addhar_url} */}
        <hr />
        <h6 className="card-subtitle mb-2 text-muted">PAN Information</h6>
        {/* Check if Pan exists before accessing */}
        <div className="row">
        <div className="col-6">
        {Pan && Pan.pan_no && <p className="card-text">PAN No: {Pan.pan_no}</p>}
        </div>
        <div className="col-6">
        {Pan && Pan.pan_url && (
          <img src={Pan.pan_url} alt="PAN Card" className="img-fluid" style={{ maxWidth: '80px' }} />
        )}
        </div>
        </div>
      </div>
       </Card.Body>
    </Card> 
    </div>
  );
};

export default ShowKYC;
