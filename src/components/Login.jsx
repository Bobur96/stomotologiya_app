/* eslint-disable no-unused-expressions */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";

const theme = createTheme();
const validateSignIn = Yup.object({
  email: Yup.string()
    .min(2, "Login must be at least 2 charaters")
    .required("Login is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is required"),
});

export default function Login() {
  let navigate = useNavigate();
  const [visibleIcon, setVisibleIcon] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    const data = { username: event.email, password: event.password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
      .then((res) => {
        console.log(res.data[0].role);
        sessionStorage.setItem("token", res.data[1]);
        navigate(`/${res.data[0].role}`);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="py-5">
        <CssBaseline />
        <ToastContainer autoClose={2500} />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validateSignIn}
            onSubmit={async (values) => {
              handleSubmit(values);
              return new Promise((res) => setTimeout(res, 500));
            }}
          >
            {({ values, errors }) => (
              <Form autoComplete="off" className="mt-4">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="email"
                      disabled={loading}
                      label="Login"
                      autoComplete="login"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} className="input_div">
                    <Field
                      fullWidth
                      label="Password"
                      name="password"
                      disabled={loading}
                      component={TextField}
                      autoComplete="password"
                      type={visibleIcon ? "password" : "text"}
                    />
                    {visibleIcon ? (
                      <VisibilityOffIcon
                        onClick={() => setVisibleIcon((prev) => !prev)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        onClick={() => setVisibleIcon((prev) => !prev)}
                      />
                    )}
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  className="mt-4"
                  disabled={loading}
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  startIcon={loading && <CircularProgress size="0.9rem" />}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
