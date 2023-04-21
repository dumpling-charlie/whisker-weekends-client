import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PlaydatesDropdown from "./PlaydatesDropdown";
import MyAccountDropdown from "./MyAccountDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn} = useContext(AuthContext);

return (
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <Link to="/">
        <img
          className="navbar-brand"
          src="/images/logo.png"
          alt="Whisker Weekends"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="nav-item collapse navbar-collapse" id="navbarNav">
        <ul className=" navbar-nav me-auto mb-2 mb-lg-0">
          <li >
            <PlaydatesDropdown />
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/friendly">
              Pet friendly
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/chat">
              Chat
            </NavLink>
          </li>
        </ul>

        {isLoggedIn && (
          <>
            <span>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <MyAccountDropdown />
                </li>
              </ul>
            </span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <span>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Log in
                  </NavLink>
                </li>
              </ul>
            </span>
          </>
        )}
      </div>
    </div>
  </nav>
);
      }
export default Navbar;

