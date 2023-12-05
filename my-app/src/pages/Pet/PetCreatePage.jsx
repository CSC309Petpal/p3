import React, { useState } from 'react';
import axios from 'axios';
import { BACKENDHOST } from "./config";

const PetCreationForm = () => {
    const [petData, setPetData] = useState({
        name: '',
        status: '',
        breed: '',
        age: '',
        size: '',
        color: '',
        gender: '',
        image: null,
        
    });
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // State for tracking submission status

    const handleChange = (e) => {
        setPetData({
            ...petData,
            [e.target.name]: e.target.value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPetData((prevData) => ({
          ...prevData,
          image: file,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKENDHOST}pets/`, petData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log(response.data);
            setSubmissionStatus('success'); // Set status to success on successful submission
        } catch (error) {
            console.error(error);
            setSubmissionStatus('error'); // Set status to error if there's an error
        }
    };

    return (
        <div>
            <div style={containerStyle}>
                <form className="card" onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <div className="form-group">
                        <label>Pet Name</label>
                        <input name="name" type="text" onChange={handleChange} placeholder="Pet Name" />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select name="status" value={petData.status} onChange={handleChange}>
                        <option value="available">Available</option>
                        <option value="adopted">Adopted</option>
                        <option value="foster">Foster</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Pet Breed</label>
                        <input name="breed" type="text" onChange={handleChange} placeholder="breed" />
                    </div>

                    <div className="form-group">
                        <label>Pet age</label>
                        <input name="age" type="integer" onChange={handleChange} placeholder="age" />
                    </div>

                    <div className="form-group">
                        <label>Pet size</label>
                        <input name="size" type="text" onChange={handleChange} placeholder="size" />
                    </div>

                    <div className="form-group">
                        <label>Pet color</label>
                        <input name="color" type="text" onChange={handleChange} placeholder="color" />
                    </div>
                    <div className="form-group">
                        <label>Pet gender</label>
                        <input name="gender" type="text" onChange={handleChange} placeholder="gender" />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    

                    

                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
                {/* Feedback Messages */}
                {submissionStatus === 'success' && <div className="alert alert-success">Pet created successfully!</div>}
                {submissionStatus === 'error' && <div className="alert alert-danger">Error creating pet. Please try again.</div>}
            </div>
        </div>
    );
};
const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginLeft: "5cm",
    marginRight: "5cm",
    padding: "1cm",
    alignItems: "center",
    justifyContent: "space-evenly",
    overflowY: "auto",
};

export default PetCreationForm;
