import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const RegisterHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="Landing.html">PetPal</a>
                <div className="d-flex" id="navbarText">
                <Link to="/login" className="btn btn-outline-light me-3">Login</Link>
                <Link to="/register-seeker" className="btn btn-outline-light me-3">Sign up</Link>
                </div>
            </div>
        </nav>
    );
};

export default RegisterHeader;