import React from "react";
import { useNavigate } from "react-router-dom";
import StartHeader from "../../components/StartHeader/startHeader";
import Footer from "../../components/Footer/footer";
import logo from "../../assets/logo.png";
import "./style.css";

const Landing = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignupClick = () => {
        navigate('/register-seeker');
    }



    return (
        <>
        <StartHeader/>

        <section className="hero hero-bg text-dark d-flex align-items-center justify-content-center flex-grow-1">
        <div className="container text-center mt-5">
            <img src={logo} className="img-fluid mb-sm-3 logo" alt="Responsive" style={{ borderRadius: '20px' }} />
            <h1 className="display-4">Welcome to PetPal</h1>
            <p className="lead">Find your furry match on PetPal, where forever homes begin!</p>
            <div className="mt-4">
            {/* Using buttons with onClick handlers instead of anchor tags */}
            <button className="btn btn-primary btn-lg me-2" onClick={handleLoginClick}>Log in</button>
            <button className="btn btn-secondary btn-lg" onClick={handleSignupClick}>Sign up</button>
            </div>
        </div>
        </section>
            <Footer/>
        </>
    );
}

export default Landing;