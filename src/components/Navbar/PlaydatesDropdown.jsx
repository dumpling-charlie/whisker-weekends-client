import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';

function PlaydatesDropdown() {

    const { isLoggedIn } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-none" id="dropdown-basic">
          Playdates
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item> <Link to="/playdates">Find</Link></Dropdown.Item>

          {isLoggedIn && (
            <>
              <Dropdown.Item> <Link to="/playdates/create">
                Organize
              </Link></Dropdown.Item>
              <Dropdown.Item> <Link to="/playdates/my-playdates">
                My Playdates
              </Link></Dropdown.Item>
          </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default PlaydatesDropdown;