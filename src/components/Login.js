import { TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import * as yup from 'yup'

const Login = () => {
  const navigate = useNavigate();
  const formValidation = yup.object({
    email : yup.string().required("*Email is madatory").min(3),
    password : yup.string().required("*Password is required with min 6 characters").min(6).max(15)
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema : formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await axios.post(
          "http://localhost:3003/users/login",
          values
        );
        console.log(user);
        localStorage.setItem("AuthToken", user.data.token);
        resetForm({ values: "" });
        navigate("/user");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    },
  });

  return (
    <div className="login-section">
      <div className="form-container">
        <h3 className="text-center">Login form</h3>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className="form-control"
            label="Email"
            variant="outlined"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error = {formik.touched.email && formik.errors.email }
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          />
          <TextField
            className="form-control mt-2"
            label="Password"
            variant="outlined"
            type={"password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            error = {formik.touched.password && formik.errors.password }
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          />
          <div className="register-container">
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Login"
            />
            <div>
              I'm not having account <Link to="/register">Register</Link>{" "}
            </div>
            <div>
              Click here to reset password
              <Link to="/forgot-password">forgot password</Link>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;