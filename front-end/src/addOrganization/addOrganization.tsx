import './addOrganization.css'
import {useNavigate} from "react-router-dom";

function AddOrganization() {

    const navigate = useNavigate();

    const handleBackClick = async () => {
        navigate("/organizations");
    }

    const handleAddOrganization = async () => {
        let path = "/addOrg";
        const inputElement = document.querySelector(".add-organization-input") as HTMLInputElement;
        const inputValue = inputElement?.value.trim();

        //Check if input is empty
        if (inputValue === "" || inputValue === null) {
            alert("Organization name cannot be empty");
            return;
        }

        const isValid = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(inputValue);
        if (!isValid) {
            alert("Invalid organization name");
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: inputValue }),
            })

            if (response.ok) {
                alert("Organization added successfully");
                inputElement.value = "";
            } else {
                alert("organization could not be added");
            }
        } catch (error) {
            console.error("Error adding organization:", error);
            alert("Organization could not be added");
        }

    }

    return (
      <div className="add-organization">
          <div className="add-organization-container">
              <input className="add-organization-input" type="text" placeholder="Organisasjonens Navn" />
              <button className="add-organization-button" type="submit" onClick={handleAddOrganization}>Add Organization</button>
          </div>

          <button className="back-button" type="button" onClick={handleBackClick} >Back</button>
      </div>
    );
}
export default AddOrganization;
