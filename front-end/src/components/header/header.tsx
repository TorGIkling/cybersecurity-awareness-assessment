import "./header.css"
import homeIcon from "../../assets/home.svg";
import {useNavigate} from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import {AuthContext} from "../AuthProvider";
import {useContext} from "react";

function Header() {

    const navigate = useNavigate();
    const {logout, username} = useContext(AuthContext)!;

    const homeClick = () => {
        navigate("/");
    }

    const handleLogOut = () => {
        logout();
    }

    return (
      <div className="header-content">
          <img className="header-img" src={(homeIcon)} alt="Home" onClick={homeClick} />
          <a className='username-txt' onClick={homeClick}>{username || "Username"}</a>
          <img className="logout-img" src={logoutIcon} alt="Logout" onClick={handleLogOut}/>
      </div>
    );
}
export default Header;