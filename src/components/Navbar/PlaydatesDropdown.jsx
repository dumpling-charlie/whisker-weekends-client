import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function PlaydatesDropdown() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-none" id="dropdown-basic">
          Playdates
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/api/playdates">Find</Dropdown.Item>

          {isLoggedIn && (
            <>
              <Dropdown.Item href="/api/playdates/create">
                Organize
              </Dropdown.Item>
              <Dropdown.Item href="/api/playdates/my-playdates">
                My Playdates
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default PlaydatesDropdown;