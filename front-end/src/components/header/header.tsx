import "./header.css"
import homeIcon from "../../assets/home.svg";
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const homeClick = () => {
        navigate("/");
    }

    return (
      <div className="header-content">
          <img className="header-img" src={(homeIcon)} alt="Home" onClick={homeClick} />
          <a className='username-txt' onClick={homeClick}>Username</a>
      </div>
    );
}
export default Header;