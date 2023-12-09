// ApplicationCreation.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationCreationForm from './ApplicationCreationForm'; // Adjust the path as needed
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BACKENDHOST } from "../../config";
import {useNavigate } from 'react-router-dom';



function ApplicationCreation() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { pet_id } = useParams();
  const token = localStorage.getItem('token');
  const isLogined = Boolean(token);
  
  async function postData(pet_id, formData, token, setError) {
    try {
      setErrorMessage(null);
      const response = await fetch(`${BACKENDHOST}applications/to-pet/${pet_id}/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('An error has occured');
        
        
      }
      else{
        const data = await response.json();
        console.log('Success:', data);
        navigate("/applications");
      }
     
      // Handle the success scenario
    } catch (error) {
      console.log("error message received from the server is : " + error.message);
      setErrorMessage(error.message);
      
    }
  }

  const handleSubmit = async (formData) => {

    await postData(pet_id, formData, token);
    
  };


  return (
    <>
      <Header/>
      <div style={containerStyle}>
        {isLogined ? (
          <ApplicationCreationForm onSubmit={handleSubmit} />
        ) : (
          <p>Please log in to continue.</p >
        )}
        <p>{errorMessage}</p >
      </div>
      <Footer/>
    </>
  );
}
const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  marginLeft: "5cm",
  marginRight: "5cm",
  padding: "1cm",
  alignItems: "center",
  justifyContent: "space-evenly",
  overflowY: "auto",
};

export default ApplicationCreation;