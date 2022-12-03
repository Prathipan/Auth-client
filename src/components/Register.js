import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import * as yup from "yup";
import { TextField } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const formValidation = yup.object({
    name: yup.string().required("*Name is mandatory"),
    email: yup.string().required("*Email is mandatory").min(3),
    password: yup
      .string()
      .required("*Password field is mandatory")
      .min(6)
      .max(15),
    cpassword: yup.string().required("*Confirm your password").min(6).max(15),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        if(values.password === values.cpassword)
        {
          const data = await axios.post(
          "http://localhost:3003/users/register",
          values
        );
        resetForm({ values: "" });
        navigate("/");
        }else{
          alert("Password mismatch")
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
  });

  return (
    <div className="login-section">
      <div className="form-container">
        <h3 className="text-center">SignUp form</h3>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            type={"text"}
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control mt-2"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            type={"email"}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control mt-2"
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type={"password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control mt-2"
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={"password"}
            id="cpassword"
            name="cpassword"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
            className="form-control mt-2"
            onBlur={formik.handleBlur}
            error={formik.touched.cpassword && formik.errors.cpassword}
            helperText={
              formik.touched.cpassword && formik.errors.cpassword
                ? formik.errors.cpassword
                : ""
            }
          />
          <div className="register-container">
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Sign Up"
            />
            <p>
              Already having an account? <Link to="/">Login</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
