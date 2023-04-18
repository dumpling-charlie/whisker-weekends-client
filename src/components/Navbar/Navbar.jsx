import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PlaydatesDropdown from "./PlaydatesDropdown";
import MyAccountDropdown from "./MyAccountDropdown";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

return (
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        Whisker Weekends
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li>
          <PlaydatesDropdown/>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/api/friendly">
            Pet friendly
          </NavLink>
        </li>
      </ul>

      {isLoggedIn && (
        <>
          <span>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <MyAccountDropdown/>
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
  </nav>
);
      }
export default Navbar;

