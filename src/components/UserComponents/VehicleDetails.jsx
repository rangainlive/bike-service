import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import "./User.css";

function VehicleDetails() {
  const history = useHistory();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/details", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
        if (response.data.message === "Authentication Failed!") {
          history.push({
            pathname: "/signin",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history]);
  return (
    <div className="vehicleContainer">
      <div className="vehicleHead">
        <div>
          <h4>Vehicle Details:</h4>
        </div>
        <div>
          {" "}
          <button className="btn btn-secondary">
            <Link to="/update-user-vehicle" id="serviceLink">
              <i className="bi bi-pencil-square"></i>
              {"  "} Update Vehicle Details
            </Link>
          </button>
        </div>
      </div>
      <div className="vehicleBody">
        {user && (
          <div>
            <div>
              <div>Model Name: {user.vehicleModal}</div>
              <div>Vehicle Number: {user.vehicleNo}</div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleDetails;
