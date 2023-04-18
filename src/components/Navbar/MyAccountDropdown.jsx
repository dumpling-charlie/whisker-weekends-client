import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function MyAccountDropdown() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {user && user.name}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
            <Dropdown.Item href="/profile">My Account</Dropdown.Item>
            <Dropdown.Item href="/pets">My Pets</Dropdown.Item>
            <button className="dropdown-item" type="button" onClick={logOutUser}>
                Logout
            </button>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default MyAccountDropdown;