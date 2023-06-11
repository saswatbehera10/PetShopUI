import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DogLogo from "./Images/DogLogo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token, expiration, and role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={DogLogo}
            alt="Company Logo"
            className="logo-img"
            style={{ maxHeight: "30px", marginRight: "10px" }}
          />
          Fluffy Furr & Co.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link active">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link active">
                Cart
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
          </ul>

          <button className="nav-link logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
