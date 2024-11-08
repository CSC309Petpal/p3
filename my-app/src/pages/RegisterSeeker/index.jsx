import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDHOST } from "../../config";
import logo from "../../assets/logo.png";
import StartHeader from "../../components/StartHeader/startHeader";
import Footer from "../../components/Footer/footer";


import LoginInput from "../../components/input/LoginInput";

const RegisterSeekerPage= () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const Register = (username, password, password2, address, email, navigate) => {
        // check if the username and password is valid
        var bad = false;
        const username_not = document.getElementById("Username_notification");
        const pwd_not = document.getElementById("Password_notification");
        const pwd2_not = document.getElementById("PasswordConfirm_notification");
        const address_not = document.getElementById("Address_notification");
        const email_not = document.getElementById("Email_notification");


        if (username === "") {
            username_not.innerHTML = "Please enter your username";
            bad = true;
        }
        else (
            username_not.innerHTML = ""
        )

        if (password === "") {
            pwd_not.innerHTML = "Please enter your password";
            bad = true;
        }
        else (
            pwd_not.innerHTML = ""
        )
        
        if (password2 === "") {
            pwd2_not.innerHTML = "Please enter your password";
            bad = true;
        }
        else (
            pwd2_not.innerHTML = ""
        )

        if (address === "") {
            address_not.innerHTML = "Please enter your address";
            bad = true;
        }
        else (
            address_not.innerHTML = ""
        )

        // use regex to check whether the email is valid
        const emailRegex = /\S+@\S+\.\S+/;


            
        if (email === "") {
            email_not.innerHTML = "Please enter your email";
            bad = true;
        }
        else (
            email_not.innerHTML = ""
        )

        if (!emailRegex.test(email)) {
            email_not.innerHTML = "Please enter a valid email";
            bad = true;
        }
        else (
            email_not.innerHTML = ""
        )



        if (password !== password2) {
            pwd2_not.innerHTML = "Password does not match";
            bad = true;
            return;
        }


        if (bad) {
            setErrorMessage("Please enter valid information");
            return;
        }
        
        username_not.innerHTML = "";
        pwd_not.innerHTML = "";
        pwd2_not.innerHTML = "";
        address_not.innerHTML = "";
        email_not.innerHTML = "";


        var data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("password_confirm", password2);
        data.append("location", address);
        data.append("email", email);
    
        fetch(`${BACKENDHOST}accounts/seeker/`, {
            method: "POST",
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    if (data.username) {
                        throw new Error(data.username[0]);
                    }else if (data.non_field_errors) {
                        throw new Error(data.non_field_errors[0]);
                    }
                    throw new Error(data.detail || 'Unknown error');
                });
            }
            return response.json();
        })
        .then(data => {
            setErrorMessage("");
            navigate('/login');
        })
        .catch(error => {
            if (error instanceof Response) {
                error.json().then(body => {
                    setErrorMessage(body.detail || 'Unknown error');
                });
            } else {
                // Handle other errors like network errors, etc.
                console.log("Network error:", error);
                setErrorMessage(error.message);
            }
        });
        
    }

    const handleSignUpClick = () => {
        navigate('/register-shelter');
      };

    // if there is a token, nav to admin/locations
    // useEffect(() => {
    //     if (token) {
    //         navigate("/admin/locations");
    //     }
    // }
    // );

    return (
        <>
            <StartHeader />

            <div className="container">
                <div className="row" style={{height: 4 + "rem"}}>
                    
                </div>

            </div>

            <main className="flex-grow-1 d-flex align-items-center bg-pink">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto mt-sm-5">
                            <img src={logo} className="img-fluid mb-sm-3" alt="Responsive image" style={{ borderRadius: '20px' }} />
                            <h1 className="text-center text-dark p-sm-3" style={{ fontSize: 'xx-large', borderRadius: '20px' }}>Welcome to PetPal</h1>
                            <h5 className="text-center text-dark p-sm-3">Find your furry match on PetPal, where forever homes begin!</h5>
                            <h5 className="text-center">Sign up for Shelter? <button onClick={handleSignUpClick} className='btn btn-primary'> Go Shelter!</button></h5>
                        </div>

                        <div className="col-md-6">
                    <div className="card p-5" >
                            <h1 className="text-center">Sign Up (Seeker)</h1>
                            <p className="text-center text-danger">{errorMessage}</p>
                            <form>
                                <div className="mb-3">
                                        <LoginInput input_lable_value="Username" 
                                        input_value={username} 
                                        update={setUsername} 
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                                </div>
                                <div className="mb-3">
                                        <LoginInput input_lable_value="Password" 
                                        input_value={password} 
                                        update={setPassword} 
                                        placeholder_value="" 
                                        type_value="password" 
                                        is_required={true} />
                                </div>
                                <div className="mb-3">
                                        <LoginInput input_lable_value="PasswordConfirm" 
                                        input_value={password2} 
                                        update={setPassword2} 
                                        placeholder_value="" 
                                        type_value="password" 
                                        is_required={true} />
                                </div>
                                <div className="mb-3">
                                        <LoginInput input_lable_value="Address"
                                        input_value={address}
                                        update={setAddress}
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                                </div>
                                <div className="mb-3">
                                        <LoginInput input_lable_value="Email"
                                        input_value={email}
                                        update={setEmail}
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-secondary" style={{marginLeft: 0 + "px"}}
                                    onClick={() => {
                                        Register(username, password, password2, address, email, navigate);
                                    }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>

                <div className="col">

                </div>

                    </div>
                </div>
            </main>



            <div className="container" style={{height: 4 + "rem"}}>
                

            </div>
            <Footer />
        </>
    );
}

export default RegisterSeekerPage;