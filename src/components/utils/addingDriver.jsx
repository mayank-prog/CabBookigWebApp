import React from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate ,useLocation } from 'react-router-dom';
import {BASE_URL} from '../../../config.js'


const DriverSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Required'),
  otp: Yup.string().when('phoneNumber', {
    is: (phoneNumber) => !!phoneNumber,
    then: Yup.string().required('Required'),
  }),
});

const AddDriverModal = ({ show, handleClose }) => {
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [otp,setOpt] = React.useState('');
  const [message,setmessage] = React.useState("");
  const [IsLoading, setIsLoading] = React.useState(false);
  const [IsOtp, setIsOtp] = React.useState(false);
  const [data, setdata] = React.useState([]);

  const formik = useFormik({
    initialValues: {
        name : '',
        phone : '',
        license_Number : "",
        phoneOtp : '' ,
    },
    validationSchema: DriverSchema,
    onSubmit: (values) => {
      // Code to submit form data\
    },
  });

  const hendelData= async ()=>{
    try {
        const {name,phone,license_Number} = formik.values;
        const id = localStorage.getItem('user_id').replaceAll('"', '');
        const response = await axios.post(`${BASE_URL}/driver/${id}`,{
            name:name,
            phone:phone,
            license_Number:license_Number
        } );
        console.log('Form submitted successfully');
        window.location.reload(false);
      } catch (error) {
        console.error('Form submission error:', error);
      }
  }

  const handleOtpSend = ()=>{
    try{ 
      setIsLoading(true); 
      let OTP = Math.floor(1000 + Math.random() * 9000);
      setOpt(OTP);
      setIsLoading(false);
      alert ("your OTP is " + OTP + "!");
      setOtpSent(true);
    }catch(err){
        setIsLoading(false);
        console.log(err) 
    }
  }

  const handleOtpVerify = async() => {
    const {phoneNumber,phoneOtp} = formik.values;
    try {
        setIsLoading(true);
        if(phoneOtp==otp){
            setmessage("otp verified successfully.");
            setOtpSent(true);
            setOtpVerified(true);
        }else{
            setmessage("Invalid OTP!");
            setOtpVerified(false);
        }
        
        setIsLoading(false);
      } catch (err) {
        setmessage("Invalid! OTP");
        console.log(err)
        setIsLoading(false);
      } 
    
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Car</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
       {IsLoading ? 
       <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      }} >
        <RiseLoader color="#36d7b7" loading={IsLoading} />
          </div>
       :
      <form onSubmit={formik.handleSubmit}>

      <div className="form-group m-2">
          <input 
          className="form-control"
          placeholder="Enter your driver Name"
          type="text" 
          id="name" 
          name="name" 
          onChange={formik.handleChange} 
          value={formik.values.name} 
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </div>

        <div className="form-group m-2">
          <input 
          placeholder="Enter your license Number"
          className="form-control"
          type="license_Number" 
          id="license_Number" 
          name="license_Number" 
          onChange={formik.handleChange} 
          value={formik.values.license_Number} 
          />
          {formik.errors.license_Number && <div>{formik.errors.license_Number}</div>}
        </div>

        <div className="form-group m-2">
          <input
            placeholder="Enter Driver valid phone Number"
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && <div>{formik.errors.phone}</div>}
        </div>

        {otpSent ? (
          <div className="form-group m-2">
            <label htmlFor="phoneOtp">OTP</label>
            <input 
            className="form-control"
            type="text" 
            id="phoneOtp" 
            name="phoneOtp" 
            onChange={formik.handleChange} 
            value={formik.values.phoneOtp} />
            {formik.errors.phoneOtp && <div>{formik.errors.phoneOtp}</div>}
            <button 
              type="button" 
              className="btn btn-sm btn-outline-success m-2" 
              onClick={handleOtpVerify} 
              disabled={formik.isSubmitting || otpVerified}>
              Verify OTP
            </button>
        {  message ? <span className="text-info">{message}</span> : <span className="text-info">{message}</span> }
          </div>
        ) : (
        
          <button 
            className="btn btn-sm btn-outline-success m-2" 
            type="button" 
            onClick={handleOtpSend} 
            disabled={formik.isSubmitting}>
            Send OTP
          </button>
        )}
        
       <div className="text-center">
        <button 
           onClick={hendelData}
           type="submit" 
           className="btn btn-primary btn-sm"
           disabled={!otpVerified || formik.isSubmitting}>
          Submit
        </button>
        
        </div>

      </form>
      }
    </div>

      </Modal.Body>
    </Modal>
  );
};

export default AddDriverModal;
