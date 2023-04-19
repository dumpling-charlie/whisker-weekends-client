import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';

function MyAccountDropdown() {

    const { user, logOutUser } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {user && user.name}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
            <Dropdown.Item> <Link to="/profile">My Account</Link></Dropdown.Item>
            <Dropdown.Item> <Link to="/pets">My Pets</Link></Dropdown.Item>
            <button className="dropdown-item" type="button" onClick={logOutUser}>
                Logout
            </button>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default MyAccountDropdown;