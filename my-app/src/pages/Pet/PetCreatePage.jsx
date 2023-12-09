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



const PetCreationForm = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user_type');
    useEffect(() => {
        if (user !== '2') {
            navigate('/noaccess');
        }
    }, []);
    
  const [petInfo, setPetInfo] = useState({
    image: '',
    age: '',
    name: '',
    gender: 'unknown',
    breed: '',
    size: 'small',
    color: '',
    status: 'available',
  });

  const [name_not, setName_not] = useState("");
  const [age_not, setAge_not] = useState("");
  const [breed_not, setBreed_not] = useState("");
  const [color_not, setColor_not] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [img_not, setImg_not] = useState("");
  const token = localStorage.getItem('token');



  const { petId } = useParams();

  const handleChange = (event) => {
    if (event.target.name === 'image') {
        const file = event.target.files[0];
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                setImg_not('Please select an image file.');
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
    let flag = false;

    // check whether the Name is not empty
    if (petInfo.name === "") {
        setName_not("Please enter the name of the pet");
        flag = true;
    }else{
        setName_not("");
    }

    // check whether the age is not empty
    if (petInfo.age === "") {
        setAge_not("Please enter the age of the pet");
        flag = true;
    }else{
        setAge_not("");
    }


    // check whether the breed is not empty
    if (petInfo.breed === "") {
        setBreed_not("Please enter the breed of the pet");
        flag = true;
    }
    else{
        setBreed_not("");
    }

    if (petInfo.color === "") {
        setColor_not("Please enter the color of the pet");
        flag = true;
    }
    else{
        setColor_not("");
    }

    if (flag) {
        return;
    }

    //check whether the age is a number
    if (isNaN(petInfo.age)) {
        setAge_not("Please enter a number for the age");
        return;
    }else{
        setAge_not("");
    }



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
    fetch(`${BACKENDHOST}pets/`, {
        method: 'POST', // or 'POST', 'PUT', 'DELETE', etc.
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
                    <p id="img_not" style={{color: "red"}}> { img_not }</p>
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
                <p id="name_not" style={{color: "red"}}> { name_not }</p>
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
            <p id="name_not" style={{color: "red"}}> { age_not }</p>
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
                <p id="name_not" style={{color: "red"}}> { breed_not }</p>
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
                <p id="name_not" style={{color: "red"}}> { color_not }</p>
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


            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select name="gender" onChange={handleChange} placeholder="unknown"  className="form-select" value={petInfo.gender}>
                         <option value="male" selected>Male</option>
                         <option value="female">Female</option>
                         <option value="unknown">Unknown</option>

                        
                         </select>
            </div>

            <div className="mb-3">
                <label>Status:</label>
                    <select name="status" value={petInfo.status} onChange={handleChange} placeholder="available" className="form-select">
                    <option value="available" selected>Available</option>
                    <option value="adopted">Adopted</option>
                    <option value="pending">Pending</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
            </div>

            <div className="mb-3">
                
                <label>Pet size</label>
                        <select name="size" onChange={handleChange} placeholder="small"  className="form-select" value={petInfo.size}>
                         <option value="small" selected>Small</option>
                         <option value="medium">Medium</option>
                         <option value="large">Large</option>
                         <option value="extra_large">Extra large</option>

                        
                         </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
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

export default PetCreationForm;

