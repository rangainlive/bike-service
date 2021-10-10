import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "../Pages/Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import  from "uuidv4";
import { useHistory } from "react-router";
import axios from "axios";
import Logo from "../../resources/bike.png";

// Initial values for Formik fields
const initialValues = {
  modalName: "",
  serviceType: "General service check-up",
  serviceDate: "",
  accept: false,
};

// Validation Scheme for formik
const validationSchema = Yup.object({
  modalName: Yup.string().required("Modal Name is required"),
  serviceDate: Yup.date().min(new Date()).required("Enter the date").nullable(),
  accept: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

function BookService() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const services = [
    "General service check-up",
    "Oil change",
    "Water wash",
    "Full Service",
  ];
  // form submission method
  const onSubmit = (values) => {
    const newService = {
      email: user.email,
      modalName: values.modalName,
      serviceType: values.serviceType,
      serviceDate: values.serviceDate,
    };
    console.log(newService);
    axios
      .post("http://localhost:5050/app/bookservice", newService)
      .then((response) => {
        console.log(response);
        history.push({
          pathname: "/user",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <img src={Logo} alt="bike" width="50" height="50" />
          <h3>Book New Service</h3>
          <Typography variant="caption">
            Please fill this form to Book Service !
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
                      className="bi bi-bicycle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z" />
                    </svg>
                    <label htmlFor="modalName">Bike Modal Name</label>
                  </div>
                  <Field
                    type="text"
                    className="form-control"
                    name="modalName"
                    aria-label="modalName"
                    id="modalName"
                  />
                </div>
                <div>
                  <ErrorMessage name="modalName">
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
                      className="bi bi-life-preserver"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm6.43-5.228a7.025 7.025 0 0 1-3.658 3.658l-1.115-2.788a4.015 4.015 0 0 0 1.985-1.985l2.788 1.115zM5.228 14.43a7.025 7.025 0 0 1-3.658-3.658l2.788-1.115a4.015 4.015 0 0 0 1.985 1.985L5.228 14.43zm9.202-9.202-2.788 1.115a4.015 4.015 0 0 0-1.985-1.985l1.115-2.788a7.025 7.025 0 0 1 3.658 3.658zm-8.087-.87a4.015 4.015 0 0 0-1.985 1.985L1.57 5.228A7.025 7.025 0 0 1 5.228 1.57l1.115 2.788zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <label htmlFor="serviceType">Service Type</label>
                  </div>
                  <Field
                    // type="password"
                    as="select"
                    className="form-control"
                    name="serviceType"
                    aria-label="serviceType"
                    id="serviceType"
                  >
                    {services.map((code, index) => {
                      return (
                        <option key={index} value={code}>
                          {code}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div>
                  <ErrorMessage name="serviceType">
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
                      className="bi bi-clock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    </svg>
                    <label htmlFor="serviceDate">Date</label>
                  </div>
                  <Field
                    name="serviceDate"
                    aria-label="serviceDate"
                    id="serviceDate"
                  >
                    {({ form, field }) => {
                      // const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <div>
                          <input
                            type="datetime-local"
                            id="demoDate"
                            {...field}
                            className="form-control"
                            selected={value}
                          />
                        </div>
                      );
                    }}
                  </Field>
                </div>
                <div>
                  <ErrorMessage name="serviceDate">
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
                <button className="btn btn-primary" type="submit">
                  Book Service
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default BookService;
