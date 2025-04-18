import './addOrganization.css'
import {useNavigate} from "react-router-dom";

function AddOrganization() {

    const navigate = useNavigate();

    const handleBackClick = async () => {
        navigate("/organizations");
    }

    const handleAddOrganization = async () => {
        let path = "/addOrg"
        const inputElement = document.querySelector(".add-organization-input") as HTMLInputElement;
        const inputValue = inputElement?.value.trim();

        //Check if input is empty
        if (inputValue === "" || inputValue === null) {
            alert("Organisasjonens navn kan ikke være tomt");
            return;
        }

        const sanitizedInput = inputValue.replace(/[<>;'"`]/g, "");

        if (inputValue !== sanitizedInput) {
            alert("Ugyldige tegn i organisasjonsnavn");
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: sanitizedInput }),
            })

            if (response.ok) {
                alert("Organisasjon lagt til");
                inputElement.value = "";
            } else {
                alert("Organisasjon kunne ikke legges til");
            }
        } catch (error) {
            console.error("Error adding organization:", error);
            alert("Det oppstod en feil under oppretting av organisasjonen.");
        }

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
