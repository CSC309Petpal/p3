import React, { useState, useEffect } from 'react';
import { BACKENDHOST } from '../../config';
import { useNavigate } from 'react-router-dom';

function PetListing() {

  const navigate = useNavigate();

    const handleDetail = (id) => {
      navigate(`/pet/${id}`);
    }
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint
    fetch(`${BACKENDHOST}/pets`)
      .then(response => response.json())
      .then(data => setPets(data.results))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  console.log(pets);

  return (

    <div className="row">
      {pets.map((pet, index) => (
        <div key={index} className="col-md-4">
          <div className="card">
            <img src={pet.image} className="card-img-top fixed-img" alt={`Pet ${index + 1}`} />
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>
              <p className="card-text">{pet.status}</p>
              {/* Replace 'PetDetail.html' with your routing logic or link */}
              <button className="btn btn-primary" onClick={() => handleDetail(pet.id)}>View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  
  );
}

export default PetListing;
