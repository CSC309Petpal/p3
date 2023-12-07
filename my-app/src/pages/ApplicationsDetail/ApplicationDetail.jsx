import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BACKENDHOST } from '../../config';
// import logo from 'path_to_logo'; // Uncomment and set the path to your logo image if needed


function Application() {
  const [applicationInfo, setApplicationInfo] = useState(null); // State to store application information
  const { application_id } = useParams();
  const navigate = useNavigate();
  console.log(applicationInfo);
  useEffect(() => {
    async function fetchApplicationInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}/pets/${application_id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  }, [application_id, navigate]); // Dependency array to re-run the effect when application_id changes

  if (!applicationInfo) {
    return <div>Loading...</div>; // Or any other loading state representation
  }
  
  
  return (
    <main className="flex-grow-1 align-items-center">
      
      <div className="container ms-6">
      <h1 className="mb-4">Application Detail</h1>
        {applicationInfo&&Object.entries(applicationInfo).map(([key, value])=>{
          let capitalied_key = key.charAt(0).toUpperCase() + key.slice(1);
          return (<p key={capitalied_key}> {capitalied_key}: {value}</p>)
        })}
        {/* Application Information and other content here */}
        {/* Use applicationInfo to render the data */}
      </div>
    </main>
  );
}

export default Application;
