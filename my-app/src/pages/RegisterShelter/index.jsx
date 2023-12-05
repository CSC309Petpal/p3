import React, { useState } from "react";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterHeader from "../../components/RegisterHeader/registerHeader";
import { Link } from "react-router-dom";
const RegisterShelter = () => {
    // const [inputValue, setInputValue] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password_check: '',
    //     address: ''
    // });

    // const handleChange = (e) => {
    //     setInputValue({
    //         ...inputValue,
    //         [e.target.name]: e.target.value
    //     });
    // };

    return (
        <>
        <RegisterHeader />
        <main className="flex-grow-1 d-flex align-items-center">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto mt-sm-5">
                    {/* <img src="logo.png" className="img-fluid mb-sm-3" alt="Responsive image" style={{ borderRadius: '20px' }} /> */}
                    <h1 className="text-center text-dark p-sm-3" style={{ fontSize: 'xx-large', borderRadius: '20px' }}>Welcome to PetPal</h1>
                    <h5 className="text-center text-dark p-sm-3">Find your furry match on PetPal, where forever homes begin!</h5>
                </div>
    
                <div className="col-md-6">
                    <form className="justify-content-center">
                        <h1 className="text-center">Sign Up (Shelter)</h1>
                        <h5 className="text-center">Sign up for Seeker? <a href="signup_seeker.html">Sign up for seeker</a></h5>
                        
                        {/* ... other parts of your component ... */}

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Enter your password again</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="inputPhone" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" required />
                        </div>

                        {/* ... other parts of your component ... */}

                        
                        <div className="mb-3 form-check">
                            {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" required /> */}
                            <label className="form-check-label" htmlFor="exampleCheck1">I've agreed to join the PetPal.</label>
                        </div>
                        <a className="btn btn-primary bg-dark" href="signup_shelter_fail.html">Submit</a>
                        
                    </form>
                </div>
            </div>
        </div>
    </main>
    </>
      );
    };


export default RegisterShelter;