import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDHOST } from "../../config";
import StartHeader from "../../components/StartHeader/startHeader";
import Footer from "../../components/Footer/footer";
import LoginInput from "../../components/input/LoginInput";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/header";


const PetUpdateForm = () => {
  const [petInfo, setPetInfo] = useState({
    image: '',
    age: '',
    name: '',
    gender: '',
    breed: '',
    size: '',
    color: '',
    status: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const { petId } = useParams();

  useEffect(() => {
    // Retrieve the petId from the URL

    if (localStorage.getItem('user_type') !== '2') {
        navigate('/noaccess');
    }

    // Fetch the current pet information
    axios.get(`${BACKENDHOST}pets/${petId}/`)
      .then(response => {
        setPetInfo(response.data);
        setImagePreview(response.data.image);
      })
      .catch(error => console.error(error));
  }, [petId]);

  const handleChange = (event) => {
    if (event.target.name === 'image') {
        const file = event.target.files[0];
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return; // Exit the function if not an image
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setPetInfo({ ...petInfo, image: file });
            };
            reader.readAsDataURL(file);
        }
    }
    setPetInfo({ ...petInfo, [event.target.name]: event.target.value });
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append all petInfo fields to formData
    Object.keys(petInfo).forEach(key => {
    if (key === 'image') {
        // If the key is 'image' and it's a File object, append the file
        if (petInfo[key] instanceof File) {
            formData.append(key, petInfo[key]);
        }
    } else {
        // If the key is not 'image' and the value is not an empty string,
        // append the key-value pair to the formData
        formData.append(key, petInfo[key]);
    }
    });
    
    // API request to update pet information
    fetch(`${BACKENDHOST}pets/${petId}/`, {
        method: 'PATCH', // or 'POST', 'PUT', 'DELETE', etc.
        headers: {
          'Authorization': `Bearer ${token}`,
          // other headers...
        },
        body: formData, // data can be `string` or {object}!
      })
      .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
        // if there is an error, display the error message to the user
        .then(response => {
            if (response && response.detail) {
                alert(response.detail);
            } else {
                const shelter_id = localStorage.getItem('shelter_id');
                // if the pet is updated successfully, redirect to the pet detail page
                navigate(`/shelterHome`);
            }
        });
  };

    const SIZE_CHOICES = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'extra_large', label: 'Extra Large' },
    ];

    const handleDelete = () => {
        // API request to delete pet
        fetch(`${BACKENDHOST}pets/${petId}/`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(response => response.data)
            .then(data => console.log(data))
            .catch(error => {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
              })
            // if there is an error, display the error message to the user
            .then(response => {
                if (response && response.detail) {
                    alert(response.detail);
                } else {
                    navigate(`/shelterHome`);
                }
            });
    }
  
  

  return (
    <>
<Header/>

    <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>

    <div className="container-fluid">

    <div className="row">

        <div className="col">

        </div>

        <div className="col-md-5">
    <div className="card p-5">
        <form onSubmit={handleSubmit} className="form-group">
            {/* <img src={petInfo.image} alt={petInfo.name} className="img-fluid mb-3" /> */}
            {imagePreview && (
                        <img src={imagePreview} alt="Pet" className="img-fluid mb-3" />
                    )}
                    <div className="mb-3">
              <label htmlFor="image" className="form-label">Pet Image</label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={petInfo.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                    id="age"
                    type="text"
                    name="age"
                    value={petInfo.age}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select name="gender" onChange={handleChange} placeholder="unknown"  className="form-control" value={petInfo.gender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>

            <div className="mb-3">
                    <label htmlFor="Status" className="form-label">Status</label>
                    <select name="status" onChange={handleChange} className="form-control" value={petInfo.status}>
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                    <option value="pending">Pending</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="breed" className="form-label">Breed</label>
                <input
                    id="breed"
                    type="text"
                    name="breed"
                    value={petInfo.breed}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="size" className="form-label">Size</label>
                <select 
                            id="size" 
                            name="size" 
                            value={petInfo.size} 
                            onChange={handleChange} 
                            className="form-control"
                        >
                            {SIZE_CHOICES.map(choice => (
                                <option key={choice.value} value={choice.value}>
                                    {choice.label}
                                </option>
                            ))}
                        </select>
            </div>
            <div className="mb-3">
                <label htmlFor="color" className="form-label">Color</label>
                <input
                    id="color"
                    type="text"
                    name="color"
                    value={petInfo.color}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Info</button>
            <button  onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete Pet</button>
        </form>
        
    </div>
</div>



        <div className="col">

        </div>
    </div>

    </div>

    <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <Footer/>
</>


  );
};

export default PetUpdateForm;