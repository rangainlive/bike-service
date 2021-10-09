import React from "react";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  role: "user",
  address: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  accept: false,
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Enter the Name"),
  email: Yup.string()
    .email("Enter your valid email")
    .required("Email field cannot be empty"),
  password: Yup.string()
    .min(6, "Password atleast 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  address: Yup.string().required("Enter your valid address"),
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Enter valid mobile number")
    .max(10, "Enter valid mobile number")
    .required("Enter your valid mobile number"),
  accept: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

function RegisterComponent() {
  const history = useHistory();
  const onSubmit = (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
      address: values.address,
      mobile: values.mobile,
    };
    axios
      .post("http://localhost:8080/register", newUser)
      .then((response) => {
        console.log(response);
        history.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <Avatar style={{ color: "green" }}></Avatar>
          <h3>Register New Account</h3>
          <Typography variant="caption">
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
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
                    <label htmlFor="name">Enter Fullname</label>
                  </div>
                  <Field
                    className="form-control"
                    name="name"
                    aria-label="name"
                    id="name"
                  />
                </div>
                <div>
                  <ErrorMessage name="name">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
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
                  <Field
                    className="form-control"
                    name="email"
                    aria-label="email"
                    id="email"
                  />
                </div>
                <div>
                  <ErrorMessage name="email">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
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
                      className="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path
                        fillRule="evenodd"
                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                      />
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                    <label htmlFor="country_id">Select Role: </label>
                  </div>
                  <Field
                    as="select"
                    className="form-control"
                    name="role"
                    id="role"
                    aria-label="role"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
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
                    <label htmlFor="password">Password</label>
                  </div>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                    aria-label="password"
                    id="password"
                  />
                </div>
                <div>
                  <ErrorMessage name="password">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  <Field
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    aria-label="confirmPassword"
                    id="confirmPassword"
                  />
                </div>
                <div>
                  <ErrorMessage name="confirmPassword">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
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
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <label htmlFor="address">Address</label>
                  </div>
                  <Field
                    className="form-control"
                    name="address"
                    aria-label="address"
                    id="address"
                  />
                </div>
                <div>
                  <ErrorMessage name="address">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
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
                  <Field
                    className="form-control"
                    name="mobile"
                    aria-label="mobile"
                    id="mobile"
                  />
                </div>
                <div>
                  <ErrorMessage name="mobile">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
                </div>
              </div>
              <div className="formBtn">
                <div>
                  <label>
                    <Field type="checkbox" name="accept" /> I accept the terms
                    and conditions.
                  </label>
                </div>
                <div>
                  <ErrorMessage name="accept">
                    {(errorMsg) => <div className="demoError">{errorMsg}</div>}
                  </ErrorMessage>{" "}
                </div>
              </div>
              <div className="formBtn">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div>
              <div className="haveAcc">
                Already hava an account ? <Link to="/">click here</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default RegisterComponent;
