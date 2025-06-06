import './login.css';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../components/AuthProvider";
import React from "react";


function Login() {

    const { login } = useContext(AuthContext)!;

    const navigate = useNavigate();

    const handleLoginClick = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //Get email and password from inputs
            let path = "/login";
            const emailInput = document.querySelector(".login-container input[type='email']") as HTMLInputElement;
            const passwordInput = document.querySelector(".login-container input[type='password']") as HTMLInputElement;
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();

            if (emailValue === "" || passwordValue === "") {
                alert("All fields are required");
                return;
            }
            //Check if inputs are valid
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
            if (!isValidEmail) {
                console.log(emailValue);
                alert("Invalid email");
                return;
            }

            const payload = {
                email: emailValue,
                password: passwordValue
            }
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const refreshToken = data.refreshToken;
                login(token, refreshToken)
                navigate("/");
            } else {
                alert("An error occurred during login check your email and password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login.");
        }

    }

    return (
        <form className="login">
            <div className="login-container">
                <p className="title-text"> Logg inn her! </p>
                <div className="input-container">
                    <input id="email" className="card-input" placeholder="Email" type="email" />
                </div>
                <div className="input-container">
                    <input id="password" className="card-input" placeholder="Password" type="password" />
                </div>
                <div className="input-container">
                    <button className="login-btn" type="submit" onClick={handleLoginClick}>Sign in</button>
                </div>
            </div>
        </form>

    );
}
export default Login;