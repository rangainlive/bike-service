import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import axios from "axios";
import "./Dashboard.css";

function UsersList() {
  const [user, setUser] = useState([]);
  const history = useHistory();

  const removeUser = (emailID) => {
    axios.post("http://localhost:5050/app/removeuser", { email: emailID });
    history.push({
      pathname: "/admin",
    });
  };
  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/userslist", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        const tempServices = response.data;
        setUser(tempServices);
        if (response.data.message === "Authentication Failed!") {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  
  return (
    <div className="userListContainer">
      <div>
        <h3>Customers List</h3>
      </div>
      {user.map((us) => {
        return (
          <div className="card p-2" key={us._id} id="cardHead">
            <div>
              <div>{us.userName}</div>
              <div>{us.email}</div>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => removeUser(us.email)}
              >
                Remove
              </button>
            </div>
            <div>Joined On: {moment(us.date).format("MMMM DD, YYYY")}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
