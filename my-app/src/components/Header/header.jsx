import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKENDHOST } from '../../pages/Login/config';
//import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Header = () => {
    const [userData, setUserData] = useState({ name: '', email: '', notifications: [] });
    const shelterId = localStorage.getItem('shelter_id');
    const seekerId = localStorage.getItem('seeker_id');
    const user_type = localStorage.getItem('user_type');
    const token = localStorage.getItem('token');

    useEffect(() => {
        
        if (user_type == '2') {
            // Replace with your API URL and add appropriate headers if needed
            fetch(`${BACKENDHOST}accounts/shelter/${shelterId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
                .then(response => response.json())
                .then(data => {
                    // Assuming data contains name, email, and notifications
                    setUserData({
                        name: data.username,
                        email: data.email,
                    });
                })
                .catch(error => console.error('Error:', error));
        } else if (user_type == '1') {
            // Replace with your API URL and add appropriate headers if needed
            fetch(`${BACKENDHOST}accounts/seeker/${seekerId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            )
                .then(response => response.json())
                .then(data => {
                    // Assuming data contains name, email, and notifications
                    setUserData({
                        name: data.username,
                        email: data.email,
                    });
                })
                .catch(error => console.error('Error:', error));
        }

        
    }, []);

    if (user_type == '1') {
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">PetPal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-lg-auto">
                        {/* Home Link */}
                        <Link className="nav-link me-lg-3" to="/pet">Home</Link>

                        {/* Profile Dropdown */}
                        <li className="nav-item dropdown me-lg-3">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li><span className="dropdown-item">User Type: Seeker</span></li>
                                <li><span className="dropdown-item">Name: {userData.name}</span></li>
                                <li><span className="dropdown-item">Email: {userData.email}</span></li>
                                <li><Link className="dropdown-item" to={`/seeker/update/${seekerId}`}>Edit</Link></li>
                            </ul>
                        </li>

                        {/* Log Out Link */}
                        <Link className="nav-link me-lg-3" to="/shelters">Shelters</Link>
                        <Link className="nav-link me-lg-3" to="/pet">Applications</Link>
                        <Link className="nav-link" to="/logout">Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
        );
    }else if (user_type == '2') {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">PetPal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-lg-auto">
                        {/* Home Link */}
                        <Link className="nav-link me-lg-3" to="/shelterHome">Home</Link>

                        {/* Profile Dropdown */}
                        <li className="nav-item dropdown me-lg-3">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                            <li><span className="dropdown-item">User Type: Shelter</span></li>
                                <li><span className="dropdown-item">Name: {userData.name}</span></li>
                                <li><span className="dropdown-item">Email: {userData.email}</span></li>
                                <li><Link className="dropdown-item" to={`/shelter/update`}>Edit</Link></li>
                            </ul>
                        </li>

                        <Link className="nav-link me-lg-3" to="/shelters">Shelters</Link>

                        {/* Log Out Link */}
                        <Link className="nav-link" to="/logout">Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
        );
    }

};

export default Header;
