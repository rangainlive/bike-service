import React from "react";
import { useHistory } from "react-router";
import "./User.css";

function UserNavbar(props) {
  const history = useHistory();

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("refresh");
    history.push({
      pathname: "/signin",
    });
  };
  return (
    <div className="userNavContainer">
      <div>
        <h3>Welcome, {props.userName}!</h3>
      </div>
      <div>
        <div className="searchInput" id="searchInput">
          <input
            type="text"
            className="form-control"
            placeholder="serach"
            aria-label="search"
            aria-describedby="button-addon2"
          />
          <button className="btn btn-primary" type="button" id="button-addon2">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div className="logout">
        <button className="btn btn-primary" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNavbar;
