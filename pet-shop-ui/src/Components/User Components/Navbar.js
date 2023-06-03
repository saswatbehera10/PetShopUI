import React from "react";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";
import PetPage from "./PetPage";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Fluffy Furr & Co.
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/HomePage" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/PetPage" className="nav-link">
                Pets
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-light">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
