// Import required packages
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import Logo from "../../resources/bike.png";

function HeaderComponent() {
  // declare user state
  const [user, setUser] = useState("");

  // useEffect function call
  useEffect(() => {
    setUser(sessionStorage.getItem("authenticatedUser"));
  }, [user]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#7952B3" }}
    >
      <Link className="navbar-brand" id="navBrand" to="/">
        <div>
          <img src={Logo} alt="bike-service" style={{ height: "40px" }} />
        </div>
        <div className="titleHead">Razor-Bike Service</div>
      </Link>
      <button
        className="navbar-toggler ms-auto"
        type="button"
        aria-label="collapseBtn"
        data-bs-toggle="collapse"
        data-bs-target="#collapseNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapseNavbar">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/signup">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HeaderComponent;
