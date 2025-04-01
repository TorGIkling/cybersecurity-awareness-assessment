import './newUser.css'
import {useNavigate} from "react-router-dom";

function NewUser() {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/userList');
    }

    const handleAddUserClick = () => {
        navigate('/userList');
    }

    return (
        <div className="new-user-page">
            <div className="new-user-container">
                <input className="new-user-input" type="email" placeholder="Epost" />
                <input className="new-user-input" type="text" placeholder="Brukernavn" />
                <input className="new-user-input" type="password" placeholder="Password" />
                <select className="new-user-input">
                    <option value="" hidden selected disabled>Velg rolle</option>
                    <option value="1">Ansatt</option>
                    <option value="2">Evaluatør</option>
                    <option value="3">Manager</option>
                </select>
                <button className="add-user-btn" type="submit" onClick={handleAddUserClick}>Legg til bruker</button>
            </div>
            <button className="back-button" type="button" onClick={handleBackClick}>Tilbake</button>
        </div>
    );
}
export default NewUser;