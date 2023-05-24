import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Home() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const handleRequestFormOpen = () => {
    setShowRequestForm(true);
  };

  const handleRequestFormClose = () => {
    setShowRequestForm(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  }

  return (
    <div className="text-centar">
      <h1>Welcome to My !</h1>
    </div>
  );
}

export default Home;
