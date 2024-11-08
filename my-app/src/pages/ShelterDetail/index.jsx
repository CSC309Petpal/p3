import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from "../../config";
import logo from '../../assets/avatar.jpg';
import { useNavigate } from "react-router-dom";
import './style.css';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Comments from '../Comment/CommentList';
import { useParams } from 'react-router-dom';

function ShelterComponent() {
  const { shelterId } = useParams();
  const [shelterInfo, setShelterInfo] = useState(null); // State to store shelter information
  
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/pet/create');
  };

  const handleAllBlog = (id) => {
    navigate(`/blog/shelter/${id}`);
  }

  const handleDetailClick = (petId) => {
    navigate(`/pet/${petId}`);
  }

  const handleUserUpdate = () => {
    navigate(`/shelter/update`);
  }

  useEffect(() => {
    // Define the function to fetch shelter information
    async function fetchShelterInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}accounts/shelter/${shelterId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.avatar === null) {
            data.avatar = logo;
          }
          data.avatar = logo;



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
  }, []); // Dependency array to re-fetch data if shelterId changes

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

      <div className="row mt-lg-4 justify-content-center">
        <h1 className="text-center col-12">Shelter's Blogs:</h1>
        <hr className="my-4 col-12 border-primary" />
        
        <div className="col-auto">
          <button className="btn btn-primary bg-dark" onClick={() => handleAllBlog(shelterId)}>All Blogs</button>
        </div>
      </div>

      <div class="row mt-lg-4" id="myPets">
                <h2 class="text-center">Pets</h2>
                <hr class="my-4 border-primary"/>
        </div>

      <div className="row justify-content-left">

        {/* Pet Cards */}
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {shelterInfo.pets.map(pet => (
    <div className="col-md-3 d-inline-block" key={pet.id} style={{ width: 'auto', marginRight: '20px' }}>
      <div className="card">
        <img src={pet.image} className="card-img-top fixed-img" alt={pet.name} />
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <p className="card-text">Status: {pet.status}</p>
          <button onClick={() => handleDetailClick(pet.id)} className="btn btn-primary">Detail</button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

      <div className="row mt-lg-4 justify-content-center">
        <h1 className="text-center col-12">Comments:</h1>
        <hr className="my-4 col-12 border-primary" />
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
