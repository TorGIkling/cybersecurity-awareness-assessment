import "./header.css"
import homeIcon from "../../assets/home.svg";

function Header() {

    return (
      <div className="header-content">
          <img className="header-img" src={(homeIcon)} alt="Home" />
          <p className='username-txt'>Username</p>
      </div>
    );
}
export default Header;