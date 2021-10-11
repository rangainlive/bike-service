import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import axios from "axios";
import "./Dashboard.css";

function NewBookings() {
  const [services, setServices] = useState([]);

  const history = useHistory();

  const actions = ["No Action", "Booked", "Rejected"];
  const status = ["Pending", "Process", "Ready for Delivery"];

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    console.log(keyToken);
    axios
      .get("http://localhost:5050/app/adminbookedservice", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        const tempServices = response.data;
        tempServices.sort(function compare(a, b) {
          var dateA = new Date(a.serviceDate);
          var dateB = new Date(b.serviceDate);
          return dateB - dateA;
        });
        setServices(tempServices);
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

  const fieldHandler = (event, id) => {
    const { name, value } = event.target;
    services.map((service) => {
      if (service._id === id) {
        if (name === "status") {
          service.status = value;
          if (value === "Ready for Delivery") {
            service.isCompleted = true;
          }
        } else if (name === "isBooked") {
          if (value === "Rejected") {
            service.isBooked = false;
          } else {
            service.isBooked = true;
          }
        }
      }
      return null;
    });
    setServices([...services]);
  };

  const updateHandler = (id) => {
    services.map((service) => {
      if (service._id === id) {
        axios
          .post("http://localhost:5050/app/updateservice", service)
          .then((response) => {
            history.push({
              pathname: "/admin",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return null;
    });
  };

  return (
    <div>
      <div>
        <h3>Booked Services</h3>
      </div>
      {services.map((service) => {
        return (
          <div className="card text-center m-2" key={service._id}>
            <div className="card-header" id="cardHead">
              <div>Service ID: {service.email}</div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => updateHandler(service._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{service.serviceType}</h5>
              <p className="card-text">
                {service.status !== "Ready for Delivery" && (
                  <div>
                    Your Booking processed Shortly. Kindly Wait for some time.
                    Our customer service employee will contact you soon{" "}
                  </div>
                )}
                {service.status === "Ready for Delivery" && (
                  <div>
                    {" "}
                    Thank you for your support. Any queries contact our customer
                    care.
                  </div>
                )}
              </p>
              <div className="statusBtn">
                <div>
                  {" "}
                  <button
                    className={
                      service.status === "Pending"
                        ? "btn btn-primary"
                        : service.status === "Ready for Delivery"
                        ? "btn btn-success"
                        : "btn btn-warning"
                    }
                  >
                    <div className="formField">
                      <div className="form-group">
                        <select
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            outlineStyle: "none",
                          }}
                          className="form-control"
                          name="status"
                          value={service.status}
                          onChange={(event) => fieldHandler(event, service._id)}
                          aria-label="status"
                          id="status"
                        >
                          {status.map((code, index) => {
                            return (
                              <option
                                key={index}
                                value={code}
                                style={{ textAlign: "center" }}
                              >
                                {code}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </button>
                </div>
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
                    <div className="formField">
                      <div className="form-group">
                        <select
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            outlineStyle: "none",
                          }}
                          className="form-control"
                          name="isBooked"
                          disabled={service.isBooked === null ? false : true}
                          value={
                            service.isBooked === null
                              ? "No Action"
                              : service.isBooked
                              ? "Booked"
                              : "Rejected"
                          }
                          onChange={(event) => fieldHandler(event, service._id)}
                          aria-label="isBooked"
                          id="isBooked"
                        >
                          {actions.map((code, index) => {
                            return (
                              <option key={index} value={code}>
                                {code}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer" id="bookedDate">
              <span>Booking Service for :</span>
              {"  "}
              {moment(service.serviceDate).format("MMMMM DD, YYYY HH:mm:ss")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NewBookings;
