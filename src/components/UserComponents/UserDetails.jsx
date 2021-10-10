import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import Logo from "../../resources/bike.png";
import moment from "moment";
import "./User.css";

function UserDetails() {
  const history = useHistory();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/details", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        setUser(response.data);
        if (response.data.message === "Authentication Failed!") {
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history]);

  return (
    <div className="personal">
      <div>
        <img src={Logo} alt="user" width="100" height="100" />
      </div>
      <div className="contact">
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-envelope-fill"></i>
            {"  "}
            {user.email}
          </button>
        </div>
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-telephone-fill"></i> {"  "}
            {user.mobile}
          </button>
        </div>
      </div>
      <div className="contact">
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-house-fill"></i>
            {"  "}
            {user.location ? user.location : <span>Edit details</span>}
          </button>
        </div>
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-gender-ambiguous"></i> {"  "}
            {user.gender ? user.gender : <span>Edit details</span>}
          </button>
        </div>
      </div>
      <div className="contact">
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-flower1"></i>
            {"  "}
            {user.plan ? user.plan : <span>Edit details</span>}
          </button>
        </div>
        <div>
          <button className="btn btn-outline-primary" disabled>
            <i className="bi bi-telephone-fill"></i> {"  "}
            {moment(user.date).format("MMMMM DD, YYYY")}
          </button>
        </div>
      </div>
      <div className="detailBtn">
        <Link to="/update-user-details" id="serviceLink">
          <button className="btn btn-secondary">
            {" "}
            <i className="bi bi-pencil-square"></i>
            {"  "} Edit Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;
