import React, { useState, useEffect } from 'react';

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch the list of pets from the Django backend
    fetch('http://localhost:8000/pets/')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Pet List</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.status} - {pet.breed}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CreatePet = () => {
  const [petData, setPetData] = useState({
    name: '',
    status: 'available',
    breed: '',
    age: '',
    size: '',
    color: '',
    gender: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleCreatePet = () => {
    // Send the petData to the Django backend for creating a new pet
    fetch('http://localhost:8000/pets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New pet created:', data);
        // Optionally, you can update the UI or perform other actions
      })
      .catch((error) => console.error('Error:', error));
  };
  

  return (
    
    <div>
      <container>
      <h2>Create a New Pet</h2>
      <form className="card" style={FormStyle}>
        {/* Input fields */}
        <div>
        <label>Name:</label>
        <input type="text" name="name" value={petData.name} onChange={handleInputChange} />
        </div>

        
        <div >
        <label>Status:</label>
        <select name="status" value={petData.status} onChange={handleInputChange}>
          <option value="available">Available</option>
          <option value="adopted">Adopted</option>
          <option value="foster">Foster</option>
        </select>
        </div>

        {/* Add more input fields as needed */}

        {/* File input for image */}
        <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Button to create a pet */}
        <button type="button" onClick={handleCreatePet}>
          Create Pet
        </button>
      </form>
      </container>
    </div>
  );
};
const FormStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  marginLeft: "5cm",
  marginRight: "5cm",
  padding: "1cm",
  alignItems: "center",
  justifyContent: "space-evenly",
  overflowY: "auto",
};

export { PetList, CreatePet };
