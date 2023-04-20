import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';
import "./Navbar.css"

function PlaydatesDropdown() {

    const { isLoggedIn, hasPets, checkForPets, user } = useContext(AuthContext);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      if (user) {
        setUserId(user._id);
      }
      checkForPets(userId);
      console.log(hasPets);
    }, [])

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