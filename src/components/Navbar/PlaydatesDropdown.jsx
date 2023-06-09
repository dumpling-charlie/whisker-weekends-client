import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';
import "./Navbar.css"

function PlaydatesDropdown() {

    const { isLoggedIn } = useContext(AuthContext);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-none" id="dropdown-basic">
          Playdates
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item> <Link to="/playdates/" className="link">Find</Link></Dropdown.Item>

          {isLoggedIn && (
            <>
              <Dropdown.Item> <Link to="/playdates/create" className="link">
                Organize
              </Link></Dropdown.Item>
              <Dropdown.Item> <Link to="/playdates/my-playdates" className="link">
                My Playdates
              </Link></Dropdown.Item>
          </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  export default PlaydatesDropdown;