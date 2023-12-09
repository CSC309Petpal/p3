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


const SeekerUpdateform = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    location: '',
    email: '',
    avatar:'',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [changedFields, setChangedFields] = useState({});
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user_type');

  const navigate = useNavigate();

  // get the seekerID from the local storage
  const seekerId = localStorage.getItem('seeker_id');

  useEffect(() => {
    if (user !== '1') {
      navigate('/noaccess');
    }
    // Fetch the current pet information
    axios.get(`${BACKENDHOST}accounts/seeker/${seekerId}/`,
    {
      method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
    }
    )
      .then(response => {
        setUserInfo(response.data);
        if (response.data.avatar) {
            setImagePreview(`${BACKENDHOST}${response.data.avatar.substring(1)}`);
            console.log(response.data.avatar);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== 'avatar') {
      setUserInfo({ ...userInfo, [name]: value });
      setChangedFields({ ...changedFields, [name]: value });
    }
  
    // Special handling for file inputs
    if (name === 'avatar') {
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
          setChangedFields({ ...changedFields, avatar: file }); // Store the file object instead of value
        };
        reader.readAsDataURL(file);
      }
    }
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
    console.log(changedFields)
    // Append all petInfo fields to formData
    Object.keys(changedFields).forEach(key => {
    if (key === 'avatar') {
        // If the key is 'image' and it's a File object, append the file
        formData.append(key, changedFields[key]);
    } else {
        // If the key is not 'image' and the value is not an empty string,
        // append the key-value pair to the formData
        formData.append(key, changedFields[key]);
    }
    });
    
    // API request to update pet information
    fetch(`${BACKENDHOST}accounts/seeker/${seekerId}/`, {
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
        // return response.json();
      })
      .then(data => {
        console.log(data);
        // Handle your successful response here
        const seeker_id = localStorage.getItem('seeker_id');
        navigate(`/seeker/${seeker_id}`);
      })
      .catch(error => {
        console.log(formData);
        console.error('Error:', error);
        // Set the error message
        setErrorMessage("Your username is already taken.")
      });
  };

    const handleDelete = () => {
        // API request to delete pet
        fetch(`${BACKENDHOST}accounts/seeker/${seekerId}/`, {
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
                    localStorage.removeItem('seeker_id');
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
    {/* Image Preview */}
    {imagePreview && (
                        <img src={imagePreview} alt="User" className="img-fluid mb-3" style={{ height: '200px', width: '200px', borderRadius: '100px' }} />
                    )}

    {/* Avatar Input */}
    <div className="mb-3">
        <label htmlFor="avatar" className="form-label">Avatar</label>
        <input
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleChange}
            className="form-control"
        />
    </div>

    {/* Username Input */}
    <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
            id="username"
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="form-control"
        />
    </div>

    {/* Email Input */}
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
            id="email"
            type="text"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="form-control"
        />
    </div>

    {/* Location Input */}
    <div className="mb-3">
        <label htmlFor="location" className="form-label">Location</label>
        <input
            id="location"
            type="text"
            name="location"
            value={userInfo.location}
            onChange={handleChange}
            className="form-control"
        />
    </div>

    {/* Error Message */}
    {errorMessage && (
        <p className="text-danger">{errorMessage}</p>
    )}

    {/* Form Buttons */}
    <div className="text-center">
        <button type="submit" className="btn btn-primary me-2">Update</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete seeker</button>
    </div>
</form>

        
    </div>
</div>



        <div className="col">

        </div>
    </div>

    </div>
    <Footer/>
</>
  );
};

export default SeekerUpdateform;