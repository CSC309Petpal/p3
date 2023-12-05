import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartHeader from "../../components/StartHeader/startHeader";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDHOST } from "../Login/config";
import logo from "../../assets/logo.png";
import LoginInput from "../../components/input/LoginInput";
import Footer from "../../components/Footer/footer";

const RegisterShelterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_check, setPasswordCheck] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
  
    const navigate = useNavigate();

    const Register = (username, password, password_check, address, email, navigate) => {
        // check if the username and password is valid
        var bad = false;
        const usernameError = document.getElementById("usernameError");
        const pwdError = document.getElementById("PasswordError");
        const pwdCheckError = document.getElementById("PasswordCheckError");
        const addressError = document.getElementById("AddressError");
        const emailError = document.getElementById("EmailError");

        if (username === "") {
            usernameError.innerHTML = "Please enter your username";
            bad = true;
        }
        else (
            usernameError.innerHTML = ""
        )

        // check the password is valid using regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            pwdError.innerHTML = "Password is not valid";
            bad = true;
        }
        else (
            pwdError.innerHTML = ""
        )


        if (password === "") {
            pwdError.innerHTML = "Please enter your password";
            bad = true;
        }
        else (
            pwdError.innerHTML = ""
        )

        if (password_check === "") {
            pwdCheckError.innerHTML = "Please enter your password";
            bad = true;
        }
        else (
            pwdCheckError.innerHTML = ""
        )   

        if (address === "") {
            addressError.innerHTML = "Please enter your address";
            bad = true;
        }
        else (
            addressError.innerHTML = ""
        )

        if (email === "") {
            emailError.innerHTML = "Please enter your email";
            bad = true;
        }
        else (
            emailError.innerHTML = ""
        )

        if (bad) {
            return;
        }

        if (password !== password_check) {
            pwdCheckError.innerHTML = "Password does not match";
            return;
        }
        
        usernameError.innerHTML = "";
        pwdError.innerHTML = "";
        pwdCheckError.innerHTML = "";
        addressError.innerHTML = "";
        emailError.innerHTML = "";


        var data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("password_check", password_check);
        data.append("address", address);
        data.append("email", email);

    
        fetch(`${BACKENDHOST}api/token/`, {
            method: "POST",
            body: data,
        })
        .then(respones => respones.json())
        .catch(error => console.error("Error:", error))
        .then(data => {
    
            console.log(data);
            // navigate to the login page
            navigate("/login");
        });
    }


    const handleSignUpClick = () => {
        navigate('/register-seeker');
      };

    return (
        <>
        <StartHeader />
        <main className="flex-grow-1 d-flex align-items-center" style={{ marginTop: '40px', marginBottom: '40px'}}>
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto mt-sm-5">
                    <img src={logo} className="img-fluid mb-sm-3" alt="Responsive image" style={{ borderRadius: '20px' }} />
                    <h1 className="text-center text-dark p-sm-3" style={{ fontSize: 'xx-large', borderRadius: '20px' }}>Welcome to PetPal</h1>
                    <h5 className="text-center text-dark p-sm-3">Find your furry match on PetPal, where forever homes begin!</h5>
                </div>
    
                <div className="col-md-6">
                    <form className="justify-content-center">
                        <h1 className="text-center">Sign Up (Shelter)</h1>
                        <h5 className="text-center">Sign up for Seeker? <button onClick={handleSignUpClick}> Go Seeker!</button></h5>
                        
                        {/* ... other parts of your component ... */}
                        
                        <div className="mb-3">
                            <p id = "usernameError" className="text-danger"></p>
                            <LoginInput input_lable_value="username"
                                        input_value={username}
                                        update={setUsername}
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                        </div>

                        <div className="mb-3">
                            <p id="EmailError" className="text-danger"></p>
                            <LoginInput input_lable_value="email" 
                                        input_value={email}
                                        update={setEmail} 
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                        </div>
                        <div className="mb-3">
                            <p id = "PasswordError" className="text-danger"></p>
                            <LoginInput input_lable_value="password"
                                        input_value={password}
                                        update={setPassword}
                                        placeholder_value="" 
                                        type_value="password" 
                                        is_required={true} />
                        </div>
                        <div className="mb-3">
                            <p id = "PasswordCheckError" className="text-danger"></p>
                            <LoginInput input_lable_value="Enter password again"
                                        input_value={password_check}
                                        update={setPasswordCheck} 
                                        placeholder_value="" 
                                        type_value="password"
                                        is_required={true} />
                        </div>
                        <div className="mb-3">
                            <p id = "AddressError" className="text-danger"></p>
                            <LoginInput input_lable_value="address"
                                        input_value={address}
                                        update={setAddress}
                                        placeholder_value="" 
                                        type_value="text" 
                                        is_required={true} />
                        </div>

                        {/* ... other parts of your component ... */}

                        
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                            <label className="form-check-label" htmlFor="exampleCheck1">I've agreed to join the PetPal.</label>
                        </div>
                        <button type="submit" className="btn btn-primary bg-dark" href="signup_shelter_fail.html" onClick={() => {
                                        Register(username, password, password_check, address, email, navigate);
                                    }}>Submit</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </main>
    <Footer />
    </>
    );
}

export default RegisterShelterPage;