import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./Dashboard.css";

function ListofServices() {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [serviceN, setServiceN] = useState("");

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/servicelist", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addServiceHandler = () => {
    axios
      .post("http://localhost:5050/app/addservice", { serviceName: serviceN })
      .then((response) => {
        // console.log(response);
        history.push({
          pathname: "/admin",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="listHead">
        <div>
          <h3>List of Services</h3>
        </div>
        <div className="searchInput" id="searchInput">
          <input
            type="text"
            className="form-control"
            value={serviceN}
            onChange={(event) => setServiceN(event.target.value)}
            placeholder="serach"
            aria-label="search"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-primary"
            onClick={addServiceHandler}
            type="button"
            id="button-addon2"
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      {list.map((data) => {
        return (
          <div className="card p-3 mt-3" key={data._id}>
            {data.serviceName}
          </div>
        );
      })}
    </div>
  );
}

export default ListofServices;
