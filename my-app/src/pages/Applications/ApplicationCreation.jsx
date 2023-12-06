import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import { Navigate } from 'react-router-dom';
import Form from './ApplicationCreationForm'

function ApplicationCreation() {
  // Assuming the login status should be based on the presence of a token
  const token = localStorage.getItem('token');
  const isLogined = token !== null; // Check for null instead of undefined

  return (
    <div>
      {isLogined ? <Form /> : <p>Please log in to continue.</p>}
    </div>
  );
}
export default ApplicationCreation;
