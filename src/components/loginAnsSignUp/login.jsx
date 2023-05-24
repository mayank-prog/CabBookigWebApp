import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import { RiseLoader } from 'react-spinners';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Phone number is Required'),
  otp: Yup.string().required('Phone otp is Required')
});

const LoginPage = () => {
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [message,setmessage] = React.useState("");
  const [IsLoading, setIsLoading] = React.useState(false);
  const [data, setdata] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      otp: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // Code to submit form data

    },
  });

  const hendelData=()=>{ 
    const id = JSON.stringify(data.user._id);
    localStorage.setItem('user_id' ,id);
    localStorage.setItem('authToken', data.token);
    window.location.reload(false);
  }

  const handleOtpSend = async() => {
    const {phoneNumber} = formik.values;
  try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/user/login`, {
           phone:phoneNumber
          });
      setIsLoading(false);
      if(response.data.otp){
          alert ("your OTP is " + response.data.otp + "!");
          setOtpSent(true);
      }else{
          alert (response.data.message);
          window.location.reload(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err)
    }  
  
};

const handleOtpVerify = async() => {
  const {phoneNumber,otp} = formik.values;
  try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/user/verifyOTP`, {
           phone:phoneNumber,
           otp:otp
          });
      setdata(response.data);
      setIsLoading(false);
      if(response.data){
          setmessage("otp verified successfully.");
          setOtpSent(true);
          setOtpVerified(true);
      }else{
          setOtpVerified(true);
      }
    } catch (err) {
      setmessage("Invalid! OTP");
      console.log(err)
      setIsLoading(false);
    } 
  
};

  return (
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
            placeholder="Enter valid phoneNumber"
            className="form-control"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber &&  <div className="text-danger">{formik.errors.phoneNumber}</div>}
        </div>

        {otpSent ? (
          <div className="form-group m-2">
            <label htmlFor="otp">OTP</label>
            <input 
            className="form-control"
            type="text" 
            id="otp" 
            name="otp" 
            onChange={formik.handleChange} 
            value={formik.values.otp} />
            {formik.errors.otp && <div>{formik.errors.otp}</div>}
            <button 
              type="button" 
              className="btn btn-sm btn-outline-success m-2" 
              onClick={handleOtpVerify} 
              disabled={formik.isSubmitting || otpVerified}>
              Verify OTP
            </button>
            <span className="text-info">{message}</span>
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
  );
        
};

export default LoginPage;
