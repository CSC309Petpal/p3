// ApplicationCreation.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationCreationForm from './ApplicationCreationForm'; // Adjust the path as needed
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BACKENDHOST } from "../../config";

async function postData(pet_id, formData, token, setError) {
  try {
    const response = await fetch(`${BACKENDHOST}applications/to-pet/${pet_id}/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      console.error('Error:', errorDetail);
      
    }
    else{
      const data = await response.json();
      console.log('Success:', data);
    }
   
    // Handle the success scenario
  } catch (error) {
    console.log("error message received from the server is : " + error.message);
    setError(error.message);
    
  }
}

function ApplicationCreation() {
  const [error, setError] = useState(null);
  const { pet_id } = useParams();
  const token = localStorage.getItem('token');
  const isLogined = Boolean(token);

  const handleSubmit = async (formData) => {

    await postData(pet_id, formData, token, setError);
  };

  console.log('Error in ApplicationCreation:', error);
  return (
    <>
      <Header/>
      <div>
        {isLogined ? (
          <ApplicationCreationForm onSubmit={handleSubmit} error={error} />
        ) : (
          <p>Please log in to continue.</p>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default ApplicationCreation;
