import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Wrong = () => {
    const user = localStorage.getItem('user_type');
    if (user === '1'){
        return(
            <Link to="/pet" className="btn btn-primary">Go Back</Link>
        )
    }else if (user === '2'){
        return(
            <Link to="/shelterHome" className="btn btn-primary">Go Back</Link>
        )
    }else{
        return(
            <Link to="/landing" className="btn btn-primary">Log in</Link>
        )
    }
};

export default Wrong;