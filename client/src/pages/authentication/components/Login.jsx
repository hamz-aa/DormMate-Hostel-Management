import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import logo from "../../../assets/Images/Registration form/hms2.svg";
import signinImg from "../../../assets/Images/Registration form/sign-in.svg";
import theme from "../../../theme/theme.js";
import "../AuthForm.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice.js";

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login({ showSignup, handleButtonClick, handleToggleForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false); // New state to track login attempts
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAdmin, isLoggedIn, status, error } = useSelector(
    (state) => state.auth
  );

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginHandleSubmit(values);
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginHandleSubmit = async (values) => {
    setLoginAttempted(true); // Mark that a login attempt has been made
    try {
      const loginData = {
        email: values.email,
        password: values.password,
      };

      // Dispatch login action
      const response = await dispatch(login(loginData));

      // Check if login was successful
      if (response && response.type === "LOGIN_SUCCESS") {
        setFormErrorMessage(""); // Clear any previous error messages on successful login

        // Send verification code after successful login
        await axios.post("/send-verification-code", { email: values.email });

        // Redirect to verification page
        navigate("auth/verify-email");
      } else {
        // Handle login failure if response type is not LOGIN_SUCCESS
        setFormErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      if (error.response && error.response.status === 404) {
        setFormErrorMessage("Invalid email or password. Please try again.");
      } else {
        setFormErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  // useEffect(() => {
  //   if (loginAttempted && error) {
  //     setFormErrorMessage(error.message);
  //   }
  // }, [error, loginAttempted]);

  // const handleForgotPassword = () => {
  //   if (formikLogin.values.email) {
  //     localStorage.setItem("forgotPasswordEmail", formikLogin.values.email);
  //     navigate("/auth/forgotPassword");
  //   } else {
  //     formikLogin.setTouched({ email: true });
  //     formikLogin.setErrors({ email: "Email is required to reset password" });
  //   }
  // };

  return (
    <CSSTransition
      in={!showSignup}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen w-screen absolute inset-0 shadow-lg overflow-auto md:overflow-hidden">
        {/* Left Side */}
        <div className="signin flex items-center justify-center h-full w-full lg:w-1/2 bg-white">
          <div className="flex flex-col items-center justify-center w-full h-screen">
            {/* Signup Form  */}
            <div className="form h-[90%] w-[85%] flex flex-col items-start justify-center gap-4">
              {/* Title  */}
              <div className="Title flex items-center justify-start h-[10vh] ">
                <span className="font-extrabold text-2xl text-heading">
                  Welcome Back! Please Sign In
                </span>
              </div>
              {/* Form  */}
              <form
                onSubmit={formikLogin.handleSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Box
                  className="md:w-[60%] w-full"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <TextField
                    label="Email Address"
                    name="email"
                    fullWidth
                    variant="standard"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    error={
                      formikLogin.touched.email &&
                      Boolean(formikLogin.errors.email)
                    }
                    helperText={
                      formikLogin.touched.email && formikLogin.errors.email
                    }
                  />
                  <FormControl
                    fullWidth
                    variant="standard"
                    error={
                      formikLogin.touched.password &&
                      Boolean(formikLogin.errors.password)
                    }
                  >
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formikLogin.values.password}
                      onChange={formikLogin.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ fontSize: "20px" }} />
                            ) : (
                              <Visibility sx={{ fontSize: "20px" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {formikLogin.touched.password &&
                      formikLogin.errors.password && (
                        <Typography variant="caption" color="error">
                          {formikLogin.errors.password}
                        </Typography>
                      )}
                  </FormControl>
                  {formErrorMessage && (
                    <Typography variant="body2" color="error">
                      {formErrorMessage}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      marginTop: "5px",
                      gap: "20px",
                    }}
                  >
                    {/* <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      sx={{ cursor: "pointer", color: "#797979" }}
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </Typography> */}
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{
                      textTransform: "unset",
                      marginTop: "20px",
                      fontSize: "16px",
                      letterSpacing: "0.7px",
                    }}
                  >
                    Sign in
                  </Button>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#797979",
                        marginRight: "2px",
                      }}
                    >
                      Don&apos;t have an account?
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      sx={{ cursor: "pointer", color: "#797979" }}
                      onClick={handleButtonClick}
                    >
                      Sign Up
                    </Typography>
                  </Box>
                </Box>
                <div className="choice h-[20%] w-full"></div>
              </form>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div
          className={`flex flex-col items-center justify-center h-[50%] lg:h-full w-full md:w-1/2 bg-[${theme.primary}] text-white hidden lg:flex`}
        >
          {/* Logo */}
          <div className="flex h-[15vh] w-full items-center justify-end pt-8">
            <img className="w-24 h-auto md:w-36" src={logo} alt="Logo" />
          </div>
          {/* Text */}
          <div className="w-full min-h-[15vh] px-4 md:px-8 pt-4">
            <h3 className="text-lg md:text-xl font-light w-[75%]">
              Ready to pick it up where you left off?{" "}
              <span
                onClick={handleToggleForm}
                className="font-extrabold cursor-pointer"
              >
                Sign in{" "}
              </span>
              and manage your hostel effortlessly!
            </h3>
          </div>
          {/* Left Img */}
          <div className="w-full h-[70vh] flex items-center justify-start">
            <img
              className="w-full object-contain"
              src={signinImg}
              alt="signIn Image"
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Login;
