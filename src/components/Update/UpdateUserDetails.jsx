import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import "../Pages/Register.css";
import { useHistory } from "react-router";
import axios from "axios";

function UpdateUserDetails() {
  const history = useHistory();

  const sex = ["Male", "Female", "Others"];
  const uType = ["Silver", "Gold", "Platinum"];

  // Initial values for Formik fields
  const [initialValues, setInitialValues] = useState({
    userName: "",
    email: "",
    location: "",
    gender: "Male",
    mobile: "",
    type: "Silver",
  });

  // form submission method
  const onSubmit = (event) => {
    event.preventDefault();
    if (initialValues.location === "") {
      alert("Enter the Location");
    } else {
      const updateUser = {
        ...initialValues,
        email: initialValues.email,
        location: initialValues.location,
        gender: initialValues.gender,
        type: initialValues.type,
      };
      console.log(updateUser);
      axios
        .post("http://localhost:5050/app/updateuser", updateUser)
        .then((response) => {
          console.log(response);
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
    console.log("Name:", name, "value:", value);
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
        console.log(response.data);
        setInitialValues({
          ...initialValues,
          _id: response.data._id,
          email: response.data.email,
          userName: response.data.userName,
          mobile: response.data.mobile,
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
  }, [history]);

  return (
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <Avatar style={{ color: "green" }}></Avatar>
          <h3>Update User</h3>
          <Typography variant="caption">
            Please fill this form to Update User Informations !
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
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <label htmlFor="userName">Username</label>
              </div>
              <input
                className="form-control"
                name="userName"
                value={initialValues.userName}
                disabled
                aria-label="userName"
                id="userName"
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
                <label htmlFor="location">Location</label>
              </div>
              <input
                type="text"
                className="form-control"
                name="location"
                value={initialValues.location}
                onChange={filedHandler}
                aria-label="location"
                id="location"
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
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <label htmlFor="gender">Gender</label>
              </div>
              <select
                className="form-control"
                name="gender"
                value={initialValues.gender}
                onChange={filedHandler}
                aria-label="gender"
                id="gender"
              >
                {sex.map((code, index) => {
                  return (
                    <option key={index} value={code}>
                      {code}
                    </option>
                  );
                })}
              </select>
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
                <label htmlFor="mobile">Mobile Number</label>
              </div>
              <input
                className="form-control"
                name="mobile"
                value={initialValues.mobile}
                disabled
                aria-label="mobile"
                id="mobile"
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
                <label htmlFor="type">Plan</label>
              </div>
              <select
                className="form-control"
                name="type"
                value={initialValues.type}
                onChange={filedHandler}
                aria-label="type"
                id="type"
              >
                {uType.map((code, index) => {
                  return (
                    <option key={index} value={code}>
                      {code}
                    </option>
                  );
                })}
              </select>
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

export default UpdateUserDetails;
