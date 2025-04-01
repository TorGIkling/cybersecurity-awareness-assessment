import './addOrganization.css'
import {useNavigate} from "react-router-dom";

function AddOrganization() {

    const navigate = useNavigate();

    const handleBackClick = async () => {
        navigate("/organizations");
    }

    const handleAddOrganization = async () => {
        navigate("/organizations");
    }

    return (
      <div className="add-organization">
          <div className="add-organization-container">
              <input className="add-organization-input" type="text" placeholder="Organisasjonens Navn" />
              <button className="add-organization-button" type="submit" onClick={handleAddOrganization}>Legg til Organisasjon</button>
          </div>

          <button className="back-button" type="button" onClick={handleBackClick} >Tilbake</button>
      </div>
    );
}
export default AddOrganization;
