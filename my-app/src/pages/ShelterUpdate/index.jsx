import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDHOST } from "../../config";
import Footer from "../../components/Footer/footer";
import axios from 'axios';
import Header from "../../components/Header/header";


const ShelterUpdateForm = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    location: '',
    email: '',
    avatar:'',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('token');
  const shelterId = localStorage.getItem('shelter_id');

  const navigate = useNavigate();

  // const { shelterId } = useParams();

  useEffect(() => {
    // Retrieve the petId from the URL

    // Fetch the current pet information
    axios.get(`${BACKENDHOST}accounts/shelter/${shelterId}/`)
      .then(response => {
        setUserInfo(response.data);
        setImagePreview(response.data.avatar);
      })
      .catch(error => console.error(error));
  },[]);

  const handleChange = (event) => {
    if (event.target.name === 'avatar') {
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
                setUserInfo({ ...userInfo, avatar: file });
            };
            reader.readAsDataURL(file);
        }
    }
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // check whether the email is valid using regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userInfo.email)) {
        setErrorMessage('Please enter a valid email.');
        return;
    }

    // Append all petInfo fields to formData
    Object.keys(userInfo).forEach(key => {
    if (key === 'avatar') {
        // If the key is 'image' and it's a File object, append the file
        if (userInfo[key] instanceof File) {
            formData.append(key, userInfo[key]);
        }
    } else {
        // If the key is not 'image' and the value is not an empty string,
        // append the key-value pair to the formData
        formData.append(key, userInfo[key]);
    }
    });
    
    // API request to update pet information
    fetch(`${BACKENDHOST}accounts/shelter/${shelterId}/`, {
        method: 'PATCH', // or 'POST', 'PUT', 'DELETE', etc.
        headers: {
          'Authorization': `Bearer ${token}`,
          // other headers...
        },
        body: formData, // data can be `string` or {object}!
      })
      .then(response => {
        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Handle your successful response here
        const shelter_id = localStorage.getItem('shelter_id');
        navigate(`/shelterHome`);
      })
      .catch(error => {
        console.error('Error:', error);
        // Set the error message
        setErrorMessage("Your username is already taken.")
      });
  };

    const handleDelete = () => {
        // API request to delete pet
        fetch(`${BACKENDHOST}accounts/shelter/${shelterId}/`, {
            method: 'DELETE', // or 'POST', 'PUT', 'DELETE', etc.
            headers: {
              'Authorization': `Bearer ${token}`,
              // other headers...
            },
          })
          .then(response => response.json())
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
                    // clean the local storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('user_type');
                    localStorage.removeItem('shelter_id');
                    // if the pet is deleted successfully, redirect to the home page
                    navigate('/landing');
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
                        <img src={imagePreview} alt="User" className="img-fluid mb-3" />
                    )}
                    <div className="mb-3">
              <label htmlFor="image" className="form-label">Avatar</label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Location</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={userInfo.location}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            {errorMessage && (
                <p className="text-danger">{errorMessage}</p>
            )}
            <button type="submit" className="btn btn-primary">Update</button>
            <button  onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete Shelter</button>
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

export default ShelterUpdateForm;
