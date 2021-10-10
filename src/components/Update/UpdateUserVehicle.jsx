import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import "../Pages/Register.css";
import { useHistory } from "react-router";
import axios from "axios";

function UpdateUserVehicle() {
  const history = useHistory();

  // Initial values for Formik fields
  const [initialValues, setInitialValues] = useState({
    email: "",
    vehicleModal: "",
    vehicleNo: "",
  });

  // form submission method
  const onSubmit = (event) => {
    event.preventDefault();
    if (initialValues.vehicleModal === "" || initialValues.vehicleNo === "") {
      alert("Fill all fields to add Vehicle details");
    } else {
      const updateUser = {
        ...initialValues,
        email: initialValues.email,
        vehicleModal: initialValues.vehicleModal,
        vehicleNo: initialValues.vehicleNo,
      };
      console.log(updateUser);
      axios
        .post("http://localhost:5050/app/updatevehicle", updateUser)
        .then((response) => {
          history.push({
            pathname: "/user",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const filedHandler = (event) => {
    const { name, value } = event.target;
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/details", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        setInitialValues({
          ...initialValues,
          _id: response.data._id,
          email: response.data.email,
        });
        if (response.data.message === "Authentication Failed!") {
          history.push({
            pathname: "/signin",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <Avatar style={{ color: "green" }}></Avatar>
          <h3>Add Vehicle Details</h3>
          <Typography variant="caption">
            Please fill this form to add Vehicle Informations !
          </Typography>
        </Grid>
        <form>
          <div className="formField">
            <div className="form-group">
              <div className="inputLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <label htmlFor="email">Email Address</label>
              </div>
              <input
                className="form-control"
                name="email"
                value={initialValues.email}
                disabled
                aria-label="email"
                id="email"
              />
            </div>
          </div>

          <div className="formField">
            <div className="form-group">
              <div className="inputLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <label htmlFor="vehicleModal">Vehicle Modal</label>
              </div>
              <input
                type="text"
                className="form-control"
                name="vehicleModal"
                value={initialValues.vehicleModal}
                onChange={filedHandler}
                aria-label="vehicleModal"
                id="vehicleModal"
              />
            </div>
            <div>
              <label className="demoError"></label>
            </div>
          </div>

          <div className="formField">
            <div className="form-group">
              <div className="inputLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-phone-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                </svg>
                <label htmlFor="vehicleNo">Vehicle Number</label>
              </div>
              <input
                className="form-control"
                name="vehicleNo"
                value={initialValues.vehicleNo}
                onChange={filedHandler}
                aria-label="vehicleNo"
                id="vehicleNo"
              />
            </div>
          </div>
        </form>
        <div className="formBtn">
          <button className="btn btn-success" type="button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </Paper>
    </Grid>
  );
}

export default UpdateUserVehicle;
