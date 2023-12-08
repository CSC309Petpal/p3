import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
<footer className="bg-dark text-white text-center py-3 mt-5">
    <div className="container"> {/* or `container-fluid` if you want it to be full width */}
        <p>&copy; 2023 PetPal All rights reserved.</p>
    </div>
</footer>

    );
};

export default Footer;