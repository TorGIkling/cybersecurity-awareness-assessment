import "./organizationsPage.css";
import Header from "../components/header/header";
import OrganizationList from "../components/organizationList/organizationList";
import {useNavigate} from "react-router-dom";


function OrganizationsPage() {

    const navigate = useNavigate();

    const handleAddOrganization = async () => {
        navigate("/addOrganization");
    }

    const handleCreateSurvey = async () => {
        navigate("/surveys");
    }

    return (
        <div className="organizations-page">
            <Header/>
            <OrganizationList/>
            <div className="organization-btn-row">
                <button className="survey-btn" type="submit" onClick={handleCreateSurvey}>Undersøkelser</button>
                <button className="add-organization-btn" type="button" onClick={handleAddOrganization}>Ny Organisasjon</button>
            </div>
        </div>
    )
}
export default OrganizationsPage;