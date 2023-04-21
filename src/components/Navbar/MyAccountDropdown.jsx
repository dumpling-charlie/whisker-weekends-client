import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';
import "./Navbar.css"

function MyAccountDropdown() {

    const { user, logOutUser } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle className="drop-account" id="dropdown-basic">
          {user && user.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            {" "}
            <Link to="/profile" className="link">My Account</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            {" "}
            <Link to="/pets" className="link">My Pets</Link>
          </Dropdown.Item>
          <button className="dropdown-item" type="button" onClick={logOutUser}>
            Logout
          </button>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default MyAccountDropdown;