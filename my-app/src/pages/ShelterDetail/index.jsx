import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import logo from '../../assets/avatar.jpg';
import { useNavigate } from "react-router-dom";
import './style.css';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";

function ShelterComponent() {
  const shelterId = localStorage.getItem('shelter_id');
  const [shelterInfo, setShelterInfo] = useState(null); // State to store shelter information
  
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/pet/create');
  };

  const handleDetailClick = (petId) => {
    navigate(`/pets/${petId}`);
  }

  const handleUserUpdate = () => {
    navigate(`/shelter/update`);
  }

  useEffect(() => {
    // Define the function to fetch shelter information
    async function fetchShelterInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}/accounts/shelter/${shelterId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.avatar === null) {
            data.avatar = logo;
          }



          setShelterInfo(data); // Update the state with shelter information
          // check if the avatar is a file or a url
          if (shelterInfo.avatar === null) {
            setShelterInfo({ ...shelterInfo, avatar: logo });
          }
          else {
            setShelterInfo({ ...shelterInfo, avatar: data.avatar });
          }
        } else {
          // Handle HTTP errors
          console.error("HTTP Error: " + response.status);
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Fetch error:", error);
      }
    }

    fetchShelterInfo(); // Call the function to fetch shelter information
  }); // Dependency array to re-fetch data if shelterId changes

  if (!shelterInfo) {
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
            src={shelterInfo.avatar}
            className="img-fluid mb-sm-3" 
            alt={logo}
            style={{ height: '200px', width: '200px', borderRadius: '100px' }} 
          />
        </div>

        <div className="col-md-8 d-flex justify-content-center">
          <table className="table border border-light table-bordered text-center border-dark">
            <tbody>
              <tr>
                <th>Shelter Name</th>
                <td>{shelterInfo.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{shelterInfo.email}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{shelterInfo.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row mt-lg-4" id="myPets">
                <h2 class="text-center">Pets</h2>
                <hr class="my-4 border-primary"/>
        </div>

      <div className="row justify-content-left">

        {/* Pet Cards */}
        {shelterInfo.pets.map(pet => (
          <div className="col-md-3" key={pet.id}>
            <div className="card">
              <img src={pet.image} className="card-img-top fixed-img" alt={pet.name} />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">Status: {pet.status}</p>
                <button onClick={() => handleDetailClick(pet.id)} className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="container m-5">
      --
    </div>
    <Footer />
    </>
  );
}

export default ShelterComponent;
