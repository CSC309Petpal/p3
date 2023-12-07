import React, { useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { BACKENDHOST } from "../../config";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";

function PetDetail() {

  const [petInfo, setPetInfo] = useState(null); // State to store pet information
  const { petId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    // Define the function to fetch pet information
    async function fetchPetInfo() {
      try {
        const response = await fetch(`${BACKENDHOST}/pets/${petId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.image === null) {
            data.image = logo;
          }



          setPetInfo(data); // Update the state with pet information
          // check if the image is a file or a url
    
          if (petInfo.image === null) {
            setPetInfo({ ...petInfo, image: logo });
          }
          else {
            setPetInfo({ ...petInfo, image: data.image });
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

    fetchPetInfo(); // Call the function to fetch pet information
  }); // Dependency array to re-fetch data if petId changes

  if (!petInfo) {
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
        <div className="col-md-9 d-flex justify-content-center flex-column align-items-center">
        <h2>
      {petInfo.status === 'adopted' ? (
        <span className="text-success">This pet has been adopted</span>
      ) : (
        <span>Adopt the pet now !<button className="btn btn-primary" onClick={() => navigate(`/pet/update/${petId}`)}>Adopt</button></span>
      )}
    </h2>
        </div>
       
      </div>

      <div className="row justify-content-center mt-lg-4">
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <img 
            src={petInfo.image}
            className="img-fluid mb-sm-3" 
            alt={logo}
            style={{ height: '200px', width: '200px', borderRadius: '100px' }} 
          />
        </div>

        <div className="col-md-8 d-flex justify-content-center">
          <table className="table border border-light table-bordered text-center border-dark">
            <tbody>
              <tr>
                <th>pet Name</th>
                <td>{petInfo.name}</td>
              </tr>
              <tr>
                <th>Shelter</th>
                <td>{petInfo.shelter}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{petInfo.gender}</td>
              </tr>
              <tr>
                <th>status</th>
                <td>{petInfo.status}</td>
              </tr>
              <tr>
                <th>Breed</th>
                <td>{petInfo.breed}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{petInfo.age}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{petInfo.size}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{petInfo.color}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

 

      
    </div>
    <div className="container m-5">
      --
    </div>
    <Footer />
    </>
  );
}

export default PetDetail;
