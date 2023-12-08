import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <div className="container">
                    <p>&copy; 2023 PetPal All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;