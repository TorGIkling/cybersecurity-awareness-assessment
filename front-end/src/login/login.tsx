import './login.css';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../components/AuthProvider";

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
                alert("Alle felt må fylles ut");
                return;
            }
            //Check if inputs are valid
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
            if (!isValidEmail) {
                console.log(emailValue);
                alert("Ugyldig epost");
                return;
            }

            const payload = {
                email: emailValue,
                password: passwordValue
            }
            console.log("emailValue: ", emailValue);
            console.log("passwordValue: ", passwordValue);
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
                login(token);
                navigate("/");
            } else {
                alert("Det oppstod en feil under innloggingen. Sjekk epost og passord.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Det oppstod en feil under innloggingen.");
        }

    }

    return (
        <form className="login">
            <div className="login-container">
                <p className="title-text"> Logg inn her! </p>
                <div className="input-container">
                    <input className="card-input" placeholder="Epost" type="email" />
                </div>
                <div className="input-container">
                    <input className="card-input" placeholder="Passord" type="password" />
                </div>
                <div className="input-container">
                    <button className="login-btn" type="submit" onClick={handleLoginClick}>Logg inn</button>
                </div>
            </div>
        </form>

    );
}
export default Login;