import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../../config';


const initialValues = {
  carNumber: '',
  insuranceNumber: '',
  chassisNumber: '',
  permitNumber: '',
  model: '',
  carName: '',
  fuelType: '',
  numberOfSeats: ''
};

const validationSchema = Yup.object().shape({
  carNumber: Yup.string().required('Car number is required'),
  insuranceNumber: Yup.string().required('Insurance number is required'),
  chassisNumber: Yup.string().required('Chassis number is required'),
  permitNumber: Yup.string().required('Permit number is required'),
  model: Yup.string().required('Model is required'),
  carName: Yup.string().required('Car name is required'),
  fuelType: Yup.string().required('Fuel type is required'),
  numberOfSeats: Yup.string().required('Number of seats is required')
});

const fuelTypeOptions = ['Petrol', 'Diesel', 'Electric'];
const numberOfSeatsOptions = ['5', '7', '9', '25'];

const onSubmit = async (values, { resetForm }) => {
    try {
      const id = localStorage.getItem('user_id').replaceAll('"', '');
      const response = await axios.post(`${BASE_URL}/car/${id}`, values);
      console.log('Form submitted successfully');
      window.location.reload(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  

const AddCarModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Car</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="carName">
              <Form.Label>Car Name</Form.Label>
              <Field type="text" name="carName" as={Form.Control} />
              <ErrorMessage name="carName" component="div" className="text-danger" />
            </Form.Group>
            
            <Form.Group controlId="carNumber">
              <Form.Label>Car Number</Form.Label>
              <Field type="text" name="carNumber" as={Form.Control} />
              <ErrorMessage name="carNumber" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="insuranceNumber">
              <Form.Label>Insurance Number</Form.Label>
              <Field type="text" name="insuranceNumber" as={Form.Control} />
              <ErrorMessage name="insuranceNumber" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="chassisNumber">
              <Form.Label>Chassis Number</Form.Label>
              <Field type="text" name="chassisNumber" as={Form.Control} />
              <ErrorMessage name="chassisNumber" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="permitNumber">
              <Form.Label>Permit Number</Form.Label>
              <Field type="text" name="permitNumber" as={Form.Control} />
              <ErrorMessage name="permitNumber" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Field type="text" name="model" as={Form.Control} />
              <ErrorMessage name="model" component="div" className="text-danger" />
            </Form.Group>


            <Form.Group controlId="fuelType">
              <Form.Label>Fuel Type</Form.Label>
              <Field as="select" name="fuelType" className="form-control">
                <option value="">Select Fuel Type</option>
                {fuelTypeOptions.map(fuelType => (
                  <option key={fuelType} value={fuelType}>{fuelType}</option>
                ))}
              </Field>
              <ErrorMessage name="fuelType" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="numberOfSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Field as="select" name="numberOfSeats" className="form-control">
                <option value="">Select Number of Seats</option>
                {numberOfSeatsOptions.map(seats => (
                  <option key={seats} value={seats}>{seats}</option>
                ))}
              </Field>
              <ErrorMessage name="numberOfSeats" component="div" className="text-danger" />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
  
);

export default AddCarModal;
