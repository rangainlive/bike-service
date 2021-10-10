import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import moment from "moment";
import "./User.css";

function ServiceDetails() {
  const [services, setServices] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/bookedservice", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        console.log(response.data);
        const tempServices = response.data;
        tempServices.sort(function compare(a, b) {
          var dateA = new Date(a.serviceDate);
          var dateB = new Date(b.serviceDate);
          return dateB - dateA;
        });
        setServices(tempServices);
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
    <div className="serviceContainer">
      {services && (
        <div>
          <div className="serviceHead">
            <div>
              <h4>Service Details</h4>
            </div>
            <div>
              <button className="btn btn-danger">
                <Link to="/book-service" id="serviceLink">
                  <i className="bi bi-bookmark-check"></i>
                  {"  "} Book Service
                </Link>
              </button>
            </div>
          </div>
          {services.length ? (
            <div className="serviceBody">
              {services.map((service) => {
                return (
                  <div className="card text-center" key={service._id}>
                    <div className="card-header" id="cardHead">
                      <div>Service ID: {service._id}</div>
                      <div>
                        <button
                          className={
                            service.isBooked === null
                              ? "btn btn-warning"
                              : service.isBooked
                              ? "btn btn-success"
                              : "btn btn-danger"
                          }
                        >
                          {service.isBooked === null ? (
                            <span> No Action</span>
                          ) : service.isBooked ? (
                            <span> Booked</span>
                          ) : (
                            <span>Rejected</span>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{service.serviceType}</h5>
                      <p className="card-text">
                        {service.status === "Pending" && (
                          <div>
                            Your Booking processed Shortly. Kindly Wait for some
                            time. Our customer service employee will contact you
                            soon{" "}
                          </div>
                        )}
                        {service.status === "Completed" && (
                          <div>
                            {" "}
                            Thank you for your support. Any queries contact our
                            customer care.
                          </div>
                        )}
                      </p>
                      <button
                        className={
                          service.status === "Pending"
                            ? "btn btn-primary"
                            : service.status === "Completed"
                            ? "btn btn-success"
                            : "btn btn-warning"
                        }
                      >
                        {service.status}
                      </button>
                    </div>
                    <div className="card-footer" id="bookedDate">
                      <span>Booking Service for :</span>
                      {"  "}
                      {moment(service.serviceDate).format(
                        "MMMMM DD, YYYY HH:mm:ss"
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {" "}
              No previous booking found... Book your service and get exciting
              discounts..
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceDetails;
