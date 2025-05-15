import './userOrganizationList.css'
import Header from "../components/header/header";
import UserList from "../components/userList/userList";
import {useLocation, useNavigate} from "react-router-dom";

function UserOrganizationList() {

    const navigate = useNavigate();
    const {organizationId} = useLocation().state as {organizationId: number};

    const handleNewUserClick = () => {
        navigate("/addUser", { state: { organizationId} });
    }

    const handleBackClick = () => {
        navigate("/organizations");
    }

    return (
        <div className="user-organization-list">
            <Header/>
            <UserList/>
            <div className="btn-row">
                <button className= 'user-list-btn' onClick={handleBackClick}>Back</button>
                <button className='user-list-btn' onClick={handleNewUserClick}>Add User</button>
            </div>

        </div>
    );
}
export default UserOrganizationList;