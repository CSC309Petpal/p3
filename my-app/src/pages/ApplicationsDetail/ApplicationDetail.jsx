import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BACKENDHOST } from '../../config';
import Followups from '../../components/Followup/followup';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";

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
        console.log(data);
        setApplicationInfo(data);
      } catch (error) {
        console.error('Fetch error:', error);
        navigate('/error'); // Navigate to an error page or handle the error appropriately
      }
    }

    fetchApplicationInfo();
  }, [application_id, navigate, token]); // Dependency array to re-run the effect when application_id changes

  const handleStatusChange = async (e) => {
    setNewStatus(e.target.value);

  };

  const updateApplicationStatus = async () => {
    try {
      setErrorMessage(null);
      const response = await fetch(`${BACKENDHOST}applications/${application_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...applicationInfo, status: newStatus }),
      });

      if (applicationInfo.status === 'accepted') {

        const response2 = await fetch(`${BACKENDHOST}pets/${applicationInfo.pet}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'adopted' }),
        });

        if (!response2.ok) {
          throw new Error('The state change is not allowed');
        }
    }

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

  console.log(applicationInfo);
  return (
    <>
    <Header />
    <main className="container">
    <div className="container mt-4">
    <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
        <h1 className=" mb-4 text-center">Application Detail</h1>
        <div className="row">
    <div className="col d-flex justify-content-center">
        <div className="mb-3">
            <button className="btn btn-secondary" onClick={() => navigate(`/pet/${applicationInfo.pet}`)}>Pet Detail</button>
        </div>
    </div>
</div>
       
            <div className="card">
                <div className="card-body">
                
                    <button className="btn btn-secondary" onClick={() => navigate(`/seeker/${applicationInfo.seeker}`)}>Seeker Detail</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/shelter/${applicationInfo.shelter}`)}>Shelter Detail</button>
                    
                    <p className="card-text mb-2">Seeker: {applicationInfo.seekername}</p>
                    <p className="card-text mb-2">Status: {applicationInfo.status}</p>
                    <p className="card-text mb-2">Pet: {applicationInfo.petname}</p>
                    <p className="card-text mb-4">Details: {applicationInfo.details}</p>

                    {/* Dropdown for status selection */}
                    <div className="mb-3">
                        <select className="form-control" value={newStatus} onChange={handleStatusChange}>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="withdrawn">Withdrawn</option>
                            <option value="denied">Denied</option>
                        </select>
                    </div>

                    {/* Update button */}
                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={updateApplicationStatus}>Update Status</button>
                    </div>

                    <h5 className="text-danger">{errorMessage}</h5>
                </div>
            </div>
        </div>
    </div>
</div>

      
        <Followups appId={application_id}/>
      
      
      
    </main>

    <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <Footer />
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

export default Application;
