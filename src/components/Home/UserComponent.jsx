import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./Home.css";

// lazy loading call
const UserNavbar = lazy(() => import("../UserComponents/UserNavbar"));
const UserDetails = lazy(() => import("../UserComponents/UserDetails"));
const VehicleDetails = lazy(() => import("../UserComponents/VehicleDetails"));
const ServiceDetails = lazy(() => import("../UserComponents/ServiceDetails"));

const renderLoader = () => <p>Loading...</p>;

function UserComponent() {
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
    <Suspense fallback={renderLoader()}>
      {user.email && (
        <div className="userContainer">
          <div className="userNavbar">
            <UserNavbar userName={user.userName} />
          </div>
          <div className="userDetails">
            <UserDetails />
          </div>
          <div className="vehicleDetails">
            {" "}
            <VehicleDetails />
          </div>
          <div className="serviceDetails">
            {" "}
            <ServiceDetails />
          </div>
        </div>
      )}
    </Suspense>
  );
}

export default UserComponent;
