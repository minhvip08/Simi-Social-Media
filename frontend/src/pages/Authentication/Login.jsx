import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/auth.action";


const initialValues = {
  email: "",
  password: "",
};
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
};
const Login = () => {
  const [formValues, setFormValues] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("handleSubmit: ", values);
    dispatch(loginUserAction({ data: values }));
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
