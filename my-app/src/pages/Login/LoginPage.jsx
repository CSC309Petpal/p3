import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDHOST } from "../../config";
import StartHeader from "../../components/StartHeader/startHeader";
import Footer from "../../components/Footer/footer";
import LoginInput from "../../components/input/LoginInput";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    console.log(`${ BACKENDHOST }`);
    const Login = (username, password, navigate) => {
        // check if the username and password is valid
        var bad = false;
        const username_not = document.getElementById("Username_notification");
        const pwd_not = document.getElementById("Password_notification");

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

        if (bad) {
            return;
        }
        
        username_not.innerHTML = "";
        pwd_not.innerHTML = "";

        var data = new FormData();
        data.append("username", username);
        data.append("password", password);
    
        fetch(`${BACKENDHOST}api/token/`, {
            method: "POST",
            body: data,
        })
        .then(respones => respones.json())
        .catch(error => console.error("Error:", error))
        .then(data => {
    
            console.log(data);

        if (data && data.access) {
            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user_type", data.user_type);
            setToken(data.access);
            if(data.user_type==1){
                localStorage.setItem("seeker_id", data.seeker_id);
                navigate("/pet");
            }else{
                localStorage.setItem("shelter_id", data.shelter_id);
                navigate(`/shelterHome`);

            }
        } else if (data && data.detail) {
            // Clear the token state
            setToken("");
            // Display an error message for failed login
            pwd_not.innerHTML = data.detail;
        }
        });
    }

    // if there is a token, nav to admin/locations
    // useEffect(() => {
    //     if (token) {
    //         navigate("/admin/locations");
    //     }
    // }
    // );

    return (
        <>
        <StartHeader/>

<div className="container" style={{ paddingTop: '4rem' }}>
</div>

<div className="container-fluid">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card p-5">
                <form>
                    <h1 className="mb-3 text-center">Petpal Login</h1>
                    <div className="mb-3">
                        <LoginInput 
                            input_lable_value="Username" 
                            input_value={username} 
                            update={setUsername} 
                            placeholder_value="" 
                            type_value="text" 
                            is_required={true} 
                        />
                    </div>
                    <div className="mb-3">
                        <LoginInput 
                            input_lable_value="Password" 
                            input_value={password} 
                            update={setPassword} 
                            placeholder_value="" 
                            type_value="password" 
                            is_required={true} 
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                Login(username, password, navigate);
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<Footer/>

        
        </>
    );
}

export default LoginPage;