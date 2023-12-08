import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BACKENDHOST } from '../../config';

function Application() {
  const [applicationInfo, setApplicationInfo] = useState(null);
  const [newStatus, setNewStatus] = useState(''); // State for the new status
  const { application_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchApplicationInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}applications/${application_id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        setApplicationInfo(data);
      } catch (error) {
        console.error('Fetch error:', error);
        navigate('/error'); // Navigate to an error page or handle the error appropriately
      }
    }

    fetchApplicationInfo();
  }, [application_id, navigate, token]); // Dependency array to re-run the effect when application_id changes

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const updateApplicationStatus = async () => {
    try {
      setErrorMessage(null);
      const response = await fetch(`${BACKENDHOST}applications/${application_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...applicationInfo, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('The state change is not allowed');
      }
      const updatedData = await response.json();
      setApplicationInfo(updatedData);
    } catch (error) {
      console.error('Update error:', error);
      setErrorMessage(error.message);
    }
  };

  if (!applicationInfo) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-grow-1 align-items-center">
      <div className="container ms-6">
        <h1 className="mb-4">Application Detail</h1>
        {Object.entries(applicationInfo).map(([key, value]) => (
          <p key={key}> {key.charAt(0).toUpperCase() + key.slice(1)}: {value}</p>
        ))}

        {/* Dropdown for status selection */}
        <select value={newStatus} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="denied">Denied</option>
        </select>

        {/* Update button */}
        <button onClick={updateApplicationStatus}>Update Status</button>
        <h5>{errorMessage}</h5>
      </div>
      
    </main>
  );
}

export default Application;
