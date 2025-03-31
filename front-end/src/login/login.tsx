import './login.css';
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const handleLoginClick = async () => {
        navigate("/");
    }

    return (
        <div className="login">
            <div className="login-container">
                <p className="title-text"> Logg inn her! </p>
                <div className="input-container">
                    <input className="card-input" placeholder="Brukernavn" type="email" />
                </div>
                <div className="input-container">
                    <input className="card-input" placeholder="Passord" type="password" />
                </div>
                <div className="input-container">
                    <button className="login-btn" type="submit" onClick={handleLoginClick}>Logg inn</button>
                </div>
            </div>
        </div>

    );
}
export default Login;