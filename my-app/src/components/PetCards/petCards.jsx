// PetCards.js
import React from 'react';
import { BACKENDHOST } from '../../pages/Login/config';
import logo from '../../assets/logo.png';

function PetCards({ pets }) {

  // use the shelter_id to get the shelter name
  const getShelterName = async (shelter_id) => {
    try {
      const response = await fetch(`${BACKENDHOST}accounts/shelter/${shelter_id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error('Error fetching shelter name:', error);
    }
  }
 
  return (
    <div className="row">
      {/* Render pet cards based on sorted `pets` prop */}
      {pets.map(pet => (
        <div className="col-md-4" key={pet.id}>
        <div className="card">
          <img src={pet.image} className="card-img-top fixed-img" alt={logo} />
          <div className="card-body">
            <h5 className="card-title">{pet.name}</h5>
            <p className="card-text">Status: {pet.status}</p>
            <p className="card-text">Shelter: {getShelterName(pet.shelter)}</p>
            <p className="card-text">age: {pet.age}</p>
            <a href={`pet_update.html?petId=${pet.id}`} className="btn btn-primary">Edit</a>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default PetCards;
