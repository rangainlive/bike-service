import React from "react";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";
// import { MdEmail, MdVpnKey } from "react-icons/md";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter your valid email")
    .required("Email field cannot be empty"),
  password: Yup.string()
    .min(6, "Password atleast 6 characters")
    .required("Password is required"),
});

function LoginComponent() {
  const history = useHistory();
  const auth = getAuth();
  const db = getDatabase();
  const onSubmit = (values) => {
    const requestData = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:8080/login", requestData)
      .then((response) => {
        console.log(response);
        const userData = response.data[0];
        const userCredential = response.data[1];
        console.log("User Info:", response);
        sessionStorage.setItem("authenticatedUser", userCredential.idToken);
        if (userData.role === "admin") {
          history.push({
            pathname: "/admin",
            state: {
              uid: userData.uid,
            },
          });
        } else {
          history.push({
            pathname: "/user",
            state: {
              uid: userData.uid,
            },
          });
        }
      })
      .catch((error) => {
        // signInWithEmailAndPassword(
        //   auth,
        //   requestData.email,
        //   requestData.password
        // )
        //   .then((userCredential) => {
        //     // Signed in

        //     const user = userCredential.user;
        //     const role = ref(db, "users/" + user.uid);

        //     onValue(role, (snapshot) => {
        //       const response = snapshot.val();
        //       const userData = response.data;
        //       const UserCredential = userCredential._tokenResponse;
        //       console.log("User Info:", response);
        //       sessionStorage.setItem(
        //         "authenticatedUser",
        //         UserCredential.idToken
        //       );
        //       if (userData.role === "admin") {
        //         history.push({
        //           pathname: "/admin",
        //           state: {
        //             uid: userData.uid,
        //           },
        //         });
        //       } else {
        //         history.push({
        //           pathname: "/user",
        //           state: {
        //             uid: userData.uid,
        //           },
        //         });
        //       }
        //     });
        //     // ...
        //   })
        //   .catch((error) => {
        //     const errorCode = error.code;
        //     // const errorMessage = error.message;
        //     console.log(errorCode);
        //   });

        console.log(error);
      });
  };
  return (
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <Avatar style={{ color: "green" }}></Avatar>
          <h3>Login</h3>
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

              <div className="formBtn">
                <div
                  style={{
                    textAlign: "right",
                    width: "100%",
                  }}
                >
                  <label>
                    <Link to="/">Forget Password.?</Link>
                  </label>
                </div>
              </div>
              <div className="formBtn">
                <button className="btn btn-success" type="submit">
                  Login
                </button>
              </div>
              <div className="haveAcc">
                Creat a New account ? <Link to="/signup">click here</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default LoginComponent;
