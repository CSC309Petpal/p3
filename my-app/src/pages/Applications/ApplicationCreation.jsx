import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import { Navigate } from 'react-router-dom';
import Form from './ApplicationCreationForm'

async function fetchData(event) {
  let pet_id = 1;
  event.preventDefault()
  try {
    const response = await fetch(`${BACKENDHOST}/applications/to-pet/${pet_id}/`);

    // Check if the status code is 403 Forbidden
    if (response.status === 403) {
      const errorDetail = await response.json();
      // Handle the custom error detail here
      console.error('Permission Denied:', errorDetail.detail);
      // You might want to throw an error or return to stop further processing
      return;
    }
    else if(response.status === 401){
      const errorDetail = await response.json();
      console.error('Unauthroized:', errorDetail.detail);
      return;
    }
    if (!response.ok) {
      // If the response is not 2xx, it will be handled here
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const data = await response.json();
    // Handle the data from the server
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during fetch
    console.error('There has been a problem with your fetch operation:', error);
  }
}


function ApplicationCreation() {
  // Assuming the login status should be based on the presence of a token
  const token = localStorage.getItem('token');
  const isLogined = token !== null; // Check for null instead of undefined
  
  
  return (
    <div>
      {isLogined ? <Form function = {fetchData}/> : <p>Please log in to continue.</p>}
    </div>
  );
}

export default ApplicationCreation;
