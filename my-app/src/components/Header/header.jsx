
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function Header(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <a class="navbar-brand" href="search.html">PetPal</a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-3">
                    <a className="nav-link" href="search.html">Home</a>
                </li>
                <li className="nav-item me-3">
                    <a className="nav-link" href="application.html">My applications</a>
                </li>
                <li className="nav-item dropdown me-3">
                    <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a className="dropdown-item" href="#">Name: Brandon</a></li>
                        <li><a className="dropdown-item" href="#">Email: brandon@outlook.com</a></li>
                        <li><a className="dropdown-item" href="user-profile_update.html">Edit</a></li>
                    </ul>
                </li>
                <li className="nav-item dropdown me-3">
                    <a className="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Notification (3)
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                        <li><a className="dropdown-item" href="chat_seeker.html">K sends you a message</a></li>
                        <li><a className="dropdown-item" href="chat_seeker.html">X sends you a message</a></li>
                        <li><a className="dropdown-item" href="chat_seeker.html">p sends you a message</a></li>
                        <li><a className="dropdown-item" href="NotificationUser.html">More</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a type="button" className="btn btn-outline-light" href="Landing.html">Log out</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
  )
};

export default Header;