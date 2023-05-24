import React, { useState, useEffect } from 'react';

import KYCcard from './kycCard'; 

function KYCPending({user, onApprove}) {
    const { name, email, phone, KYC } = user;

  const handleApprove = (status, _id) => { 
      onApprove(status, _id);
    };

  return (
    <div className="container">
      <div className="card">
      <div className="card-body">
        <h6 className="text-dark">{name}({phone})</h6>
        <span className="text-info">{email}</span>
          {KYC.map((kyc) => (
             <KYCcard key={kyc._id} kyc={kyc} onApprove={handleApprove}/> 
            ))} 
        </div>
      </div>
    </div>
  );
}

export default KYCPending;