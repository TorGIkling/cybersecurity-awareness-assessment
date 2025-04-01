import './userOrganizationList.css'
import Header from "../components/header/header";
import UserList from "../components/userList/userList";
import {useNavigate} from "react-router-dom";

function UserOrganizationList() {

    const navigate = useNavigate();

    const handleNewUserClick = () => {
        navigate("/addUser");
    }

    const handleBackClick = () => {
        navigate("/organizations");
    }

    return (
        <div className="user-organization-list">
            <Header/>
            <UserList/>
            <div className="btn-row">
                <button className= 'user-list-btn' onClick={handleBackClick}>Tilbake</button>
                <button className='user-list-btn' onClick={handleNewUserClick} >Ny Bruker</button>
            </div>

        </div>
    );
}
export default UserOrganizationList;