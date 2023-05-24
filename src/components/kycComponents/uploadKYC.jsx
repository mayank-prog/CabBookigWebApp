import React, { useState } from 'react';
import axios from 'axios';
// import { Image } from 'cloudinary-react';
import { Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {BASE_URL} from '../../../config';
import { RiseLoader } from 'react-spinners';


const uplodSchema = Yup.object().shape({

  });

const UploadKYC= () => {
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [aadhaarUrl, setAadhaarUrl] = useState('');
  const [panUrl, setPanUrl] = useState('');
  const [aadhaarFileName, setAadhaarFileName] = useState('');
  const [panFileName, setPanFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);  


  const handleAadhaarImageUpload = async (e) => {
    const file = e.target.files[0];
    setAadhaarImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mfu32ynx'); // Replace with your Cloudinary preset

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dh7c5lhpg/image/upload',
        formData
      );
      setAadhaarUrl(response.data.secure_url);
      setAadhaarFileName(response.data.original_filename);
      setIsLoading(false);
    } catch (error) {
      console.log('Error uploading Aadhaar image: ', error);
    }
  };

  const handlePanImageUpload = async (e) => {
    const file = e.target.files[0];
    setPanImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mfu32ynx'); // Replace with your Cloudinary preset

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dh7c5lhpg/image/upload',
        formData
      );

      setPanUrl(response.data.secure_url);
      setPanFileName(response.data.original_filename);
      setIsLoading(false);
    } catch (error) {
      console.log('Error uploading PAN image: ', error);
    }
  };

  const formik = useFormik({
    initialValues: {
        addhar:'',
        pan:'',
        account:'',
        upi_id:''
    },
    validationSchema: uplodSchema,
    onSubmit: async (values) => {
      const { addhar, pan, account, upi_id} = values;
      const kycdata = {
        account_no : account,
        upi_id : upi_id,
        Addhar :{
            addhar_no : addhar,
            addhar_url : aadhaarUrl,
            },
        Pan : {
            pan_no : pan,
            pan_url : panUrl
            },    
       } 
    // adding data to mongodb
       const id = localStorage.getItem('user_id').replaceAll('"', '');
       try {
        const response = await axios.post(`${BASE_URL}/user_kyc/${id}`,
          kycdata
        );
        window.location.reload(false);
      } catch (error) {
        console.log('Internal Server Error', error);
      }
    
    },

  });
  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
    <Card style={{ width: '600px' }}>
      <Card.Body>
       <Card.Title className="text-center">Upload Data for KYC.</Card.Title>
       <form onSubmit={formik.handleSubmit}>
       <div className="row">
       <div className="col-6">

       <div className="form-group m-2">
          <input 
          className="form-control"
          placeholder="Enter your Addhar Number"
          type="text" 
          id="addhar" 
          name="addhar" 
          onChange={formik.handleChange} 
          value={formik.values.addhar} 
          />
          {formik.errors.addhar && <div>{formik.errors.addhar}</div>}
        </div>

        <div className="form-group m-2">
          <input 
          placeholder="Enter your Pan Number"
          className="form-control"
          type="text" 
          id="pan" 
          name="pan" 
          onChange={formik.handleChange} 
          value={formik.values.pan} 
          />
          {formik.errors.pan && <div>{formik.errors.pan}</div>}
        </div> 

        <div className="form-group m-2">
          <input 
          placeholder="Enter your Account Number"
          className="form-control"
          type="text" 
          id="account" 
          name="account" 
          onChange={formik.handleChange} 
          value={formik.values.account} 
          />
          {formik.errors.account && <div>{formik.errors.account}</div>}
        </div> 
        
        <div className="form-group m-2">
          <input 
          placeholder="Enter your UPI_ID Number"
          className="form-control"
          type="text" 
          id="upi_id" 
          name="upi_id" 
          onChange={formik.handleChange} 
          value={formik.values.upi_id} 
          />
          {formik.errors.upi_id && <div>{formik.errors.upi_id}</div>}
        </div> 

      {/* <button onClick={handleSubmit}>Submit</button> */}

     
      </div>
      <div className="col-6">
      <h6 className="text-center">Uploaded Images</h6>
      <div>
        <label>Aadhaar Card</label>
        <input 
          className="form-control"
          type="file" 
          accept="image/*" 
          onChange={handleAadhaarImageUpload} 
          />
        {aadhaarImage && 
         <img 
           src={aadhaarImage} 
           alt="Aadhaar Card" 
           style={{ maxWidth: '80px' }} 
           />
        }
      </div>

      <div>
        <h4>PAN Card</h4>
        <input 
        className="form-control"
        type="file" accept="image/*" 
        onChange={handlePanImageUpload} 
        />
        {panImage && 
          <img 
           src={panImage} 
           alt="PAN Card" 
           style={{ maxWidth: '80px' }} 
           />}
      </div>
      </div>
    </div>

   {isLoading ?
    <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          <RiseLoader color="#36d7b7" loading={isLoading} />
        </div>
    </div>
    : 
    ""
    }
    <div className="text-center m-2">
        <button 
           type="submit" 
           className="btn btn-primary btn-sm"
          //disabled={!otpVerified || formik.isSubmitting}
           >
          Submit
        </button>
        
        </div>
    </form>
      </Card.Body>
    </Card>
  </div>

  );
};

export default UploadKYC;
