import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import logo from '../../assets/avatar.jpg';
import { useNavigate } from "react-router-dom";
import './style.css';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Comments from '../Comment/CommentList';

function ShelterComponent() {
  const shelterId = localStorage.getItem('shelter_id');
  const user = localStorage.getItem('user_type');

  const [shelterInfo, setShelterInfo] = useState(null); // State to store shelter information
  
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/pet/create');
  };

  const handleUpdateClick = (petId) => {
    navigate(`/pet/update/${petId}`);
  }

  const handleUserUpdate = () => {
    navigate(`/shelter/update`);
  }

  const handleCreateBlog = () => {
    navigate(`/blog/create`);
  }

  const handleAllBlog = (id) => {
    navigate(`/blog/shelter/${id}`);
  }



  useEffect(() => {
    // Define the function to fetch shelter information
    async function fetchShelterInfo() {
      try {
        if (user !== '2') {
          navigate('/noaccess');
        }
        const response = await fetch(`${BACKENDHOST}accounts/shelter/${shelterId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.avatar === null) {
            data.avatar = logo;
          }



          setShelterInfo(data); // Update the state with shelter information
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

    fetchShelterInfo(); // Call the function to fetch shelter information
  },[]); // Dependency array to re-fetch data if shelterId changes

  if (!shelterInfo) {
    return <div>Loading...</div>; // Display loading message until data is fetched
  }

  return (
    <>
    <Header />
    <div className="container">
      <div className="row mt-lg-4">
        <h1 className="text-center">Home</h1>
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
          <div>
            <button onClick={handleUserUpdate} className="btn btn-primary btn-lg bg-dark">Update Profile</button>
          </div>
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

      <div className="row mt-lg-4 justify-content-center">
        <h1 className="text-center col-12">My Blogs:</h1>
        <hr className="my-4 col-12 border-primary" />
        
        <div className="col-auto">
          <button className="btn btn-primary bg-dark me-2" onClick={handleCreateBlog}>Create Blog</button>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary bg-dark" onClick={() => handleAllBlog(shelterId)}>All Blogs</button>
        </div>
      </div>


      <div className="row mt-lg-4" id="myPets">
                <h1 className="text-center">My Pets</h1>
                <hr className="my-4 border-primary"/>
        </div>

      <div className="row justify-content-left">
        {/* Add Pet Card */}
        <div className="container-fluid">
  <div className="row flex-nowrap" style={{ overflowX: 'auto' }}>
    {/* Add Pet Card */}
    <div className="col" style={{ minWidth: '260px', maxWidth: '18rem', padding: '0 10px' }}>
      <div className="card custom-card h-100 d-flex align-items-center justify-content-center" onClick={handleAddClick}>
        <div className="card-body">
          <span className="plus-sign" style={{ fontSize: '3rem' }}>+</span>
        </div>
      </div>
    </div>

    {/* Pet Cards */}
    {shelterInfo.pets.map(pet => (
      <div className="col" key={pet.id} style={{ minWidth: '260px', maxWidth: '18rem', padding: '0 10px' }}>
        <div className="card h-100">
          <img src={pet.image} className="card-img-top" alt={pet.name} style={{ height: '10rem', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{pet.name}</h5>
            <p className="card-text">Status: {pet.status}</p>
            <button onClick={() => handleUpdateClick(pet.id)} className="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      </div>

      <div className="row mt-lg-4" id="comments">
                <h1 className="text-center">Comments</h1>
                <hr className="my-4 border-primary"/>
        </div>
      <div className="row justify-content-center">
        {/* comment list */}
        <Comments shelterId={shelterId} />
      </div>
    </div>
    <div className="container">
      --
    </div>
    <Footer />
    </>
  );
}

export default ShelterComponent;
