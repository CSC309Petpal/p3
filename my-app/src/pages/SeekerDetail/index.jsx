import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import logo from '../../assets/avatar.jpg';
import { useNavigate } from "react-router-dom";
import './style.css';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import { useParams } from 'react-router-dom';

function SeekerComponent() {
  const { seekerId } = useParams();
  const [seekerInfo, setseekerInfo] = useState(null); // State to store seeker information
  
  const navigate = useNavigate();




  useEffect(() => {
    // Define the function to fetch seeker information
    async function fetchseekerInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}accounts/seeker/${seekerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.avatar === null) {
            data.avatar = logo;
          }else {
            data.avatar = `${BACKENDHOST}${data.avatar.substring(1)}`; 
          }
        
          setseekerInfo(data); // Update the state with seeker information
          // check if the avatar is a file or a url

        } else {
          // Handle HTTP errors
          console.error("HTTP Error: " + response.status);
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Fetch error:", error);
      }
    }

    fetchseekerInfo(); // Call the function to fetch seeker information
  }, []); // Dependency array to re-fetch data if seekerId changes

  if (!seekerInfo) {
    return <div>Loading...</div>; // Display loading message until data is fetched
  }

  return (
    <>
    <Header />
    <div className="container">
      <div className="row mt-lg-4">
        <h1 className="text-center">Basic Information</h1>
        <hr className="my-4 border-primary" />
      </div>

      <div className="row justify-content-center mt-lg-4">
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <img 
            src={seekerInfo.avatar}
            className="img-fluid mb-sm-3" 
            alt={logo}
            style={{ height: '200px', width: '200px', borderRadius: '100px' }} 
          />
        </div>

        <div className="col-md-8 d-flex justify-content-center">
          <table className="table border border-light table-bordered text-center border-dark">
            <tbody>
              <tr>
                <th>seeker Name</th>
                <td>{seekerInfo.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{seekerInfo.email}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{seekerInfo.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SeekerComponent;
