import "./organizationsPage.css";
import Header from "../components/header/header";
import OrganizationList from "../components/organizationList/organizationList";
import {useNavigate} from "react-router-dom";
import addOrganization from "../addOrganization/addOrganization";

function OrganizationsPage() {

    const navigate = useNavigate();

    const handleAddOrganization = async () => {
        navigate("/add-organization");
    }

    return (
        <div className="organizations-page">
            <Header/>
            <OrganizationList/>
            <button className="add-organization-btn" type="button" onClick={handleAddOrganization}>Ny Organisasjon</button>
        </div>
    )
}
export default OrganizationsPage;