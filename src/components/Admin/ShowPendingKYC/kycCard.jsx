import React from "react";
import { ImCross,  } from "react-icons/Im";
import {MdDoneOutline} from "react-icons/md";

const KYCcard = ({ kyc, onApprove }) => {
  const { _id, Addhar, Pan, account_no, upi_id } = kyc;

  const handleApproveClick = (status) => {
    onApprove(status, _id); 
  };

  return (
    <div className="card m-2">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <span>Bank Account no: {account_no}</span>
            <br />
            <span>UPI : {upi_id}</span>
            <br />
            <hr />
            <div className="row">
            <div className="col-4">
            <ImCross size="30px" style={{ color: 'red' ,cursor: "pointer" }} onClick={()=>handleApproveClick("Rejected")}/>
            </div>
            <div className="col-4">
            <MdDoneOutline size="30px" style={{ color: "green", cursor: "pointer" }} onClick={()=>handleApproveClick("Approved")}/>
            </div>

          </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6 border">
              <span> Addhar Number  : {Addhar.addhar_no}</span>
              <br/>

                <img
                  src={Pan.pan_url}
                  alt="PAN Card"
                  className="img-fluid m-2"
                  style={{ maxWidth: "80px" }}
                />
              </div>
              <div className="col-6 border">
              <span> PAN Number  : {Pan.pan_no}</span>
              <br/>
                <img
                  src={Addhar.addhar_url}
                  alt="Aadhaar No"
                  className="img-fluid"
                  style={{ maxWidth: "80px" }}
                />
              </div>
            </div>
          </div>
          </div>
         
      </div>
    </div>
  );
};

export default KYCcard;
