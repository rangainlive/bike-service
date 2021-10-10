import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import axios from "axios";
import "./Dashboard.css";

function UsersList() {
  const [user, setUser] = useState([]);
  const history = useHistory();

  const removeUser = (emailID) => {
    console.log(emailID);
    axios.post("http://localhost:5050/app/removeuser", { email: emailID });
    history.push({
      pathname: "/admin",
    });
  };
  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    console.log(keyToken);
    axios
      .get("http://localhost:5050/app/userslist", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        console.log(response.data);
        const tempServices = response.data;

        setUser(tempServices);
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
    <div className="userListContainer">
      {user.map((us) => {
        return (
          <div className="card" key={us._id} id="cardHead">
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
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
