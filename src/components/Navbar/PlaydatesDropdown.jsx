import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function PlaydatesDropdown() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Playdates
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="/playdates">Find</Dropdown.Item>
          
          {isLoggedIn && (
            <>
                <Dropdown.Item href="/playdates/create">Organize</Dropdown.Item>
                <Dropdown.Item href="/playdates/my-playdates">My Playdates</Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default PlaydatesDropdown;