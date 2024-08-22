import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import logo from "../../../assets/Images/Registration form/hms2.svg";
import signupImg from "../../../assets/Images/Registration form/sign-up.svg";
import "../AuthForm.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  colleges,
  course,
  hostel,
  roomType,
} from "../../../resources/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../redux/slices/authSlice.js";

const validationSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  college: yup.string().required("College selection is required"),
  course: yup.string().required("Course selection is required"),
  hostel: yup.string().required("Hostel selection is required"),
  roomType: yup.string().required("Room Type selection is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const Registration = ({ showSignup, handleButtonClick }) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      college: "",
      course: "",
      hostel: "",
      roomType: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        const userData = {
          name: values.fullName,
          email: values.email,
          password: values.password,
          college: values.college,
          course: values.course,
          hostel: values.hostel,
        };
        dispatch(signup(userData));
        alert("Registration successful!");
        handleButtonClick();
      } catch (error) {
        console.error("There was an error registering!", error);
      }
    },
  });

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    "&.Mui-selected": {
      backgroundColor: "#f0f0f0",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#e0e0e0",
    },
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  }));

  return (
    <CSSTransition
      in={showSignup}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-screen absolute inset-0 shadow-lg overflow-auto md:overflow-hidden">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 md:bg-primary text-white hidden lg:flex">
          {/* Logo */}
          <div className="flex h-[15vh] w-full items-center justify-start pt-4">
            <img className="w-24 h-auto md:w-36" src={logo} alt="Logo" />
          </div>
          {/* Text */}
          <div className="w-full min-h-[10vh] px-4 md:px-8 pt-4">
            <h3 className="text-lg md:text-xl font-light w-[70%]">
              Streamline Your Hostel Operations with{" "}
              <span className="font-extrabold">DormMate&apos;s </span>
              Smart Management System.
            </h3>
          </div>
          {/* Left Img */}
          <div className="w-full h-[70vh] flex items-center justify-center pb-4">
            <img
              className="w-full object-contain h-auto max-h-[75vh]"
              src={signupImg}
              alt="Sign up illustration"
            />
          </div>
        </div>
        {/* Right Side */}
        <Box
          className="signup"
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
            height: { xs: "100%", sm: "100%", md: "100%", lg: "100vh" },
            overflowY: { xs: "auto" },
          }}
        >
          <Box
            className="signup_content"
            sx={{
              gap: { xs: "20px", sm: "15px", md: "15px", lg: "15px" },
              width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
            }}
          >
            <Typography
              color={"#2E475A"}
              fontWeight={700}
              fontSize={"1.7rem"}
              lineHeight={"2rem"}
              variant="h4"
            >
              Create Account
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                variant="standard"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                variant="standard"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Box
                className="signup_row"
                sx={{
                  display: "flex",
                  gap: { xs: "20px", md: "0px" },
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                  },
                  justifyContent: {
                    sm: "flex-start",
                    md: "space-between",
                    lg: "space-between",
                  },
                  alignItems: {
                    sm: "flex-start",
                    md: "center",
                    lg: "center",
                  },
                }}
              >
                <FormControl
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                  variant="standard"
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
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
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="caption" color="error">
                      {formik.errors.password}
                    </Typography>
                  )}
                </FormControl>
                <FormControl
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                  variant="standard"
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                >
                  <InputLabel htmlFor="standard-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff sx={{ fontSize: "20px" }} />
                          ) : (
                            <Visibility sx={{ fontSize: "20px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Typography variant="caption" color="error">
                        {formik.errors.confirmPassword}
                      </Typography>
                    )}
                </FormControl>
              </Box>
              <Box
                className="signup_row"
                sx={{
                  display: "flex",
                  gap: { xs: "20px", md: "0px" },
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                  },
                  justifyContent: {
                    sm: "flex-start",
                    md: "space-between",
                    lg: "space-between",
                  },
                  alignItems: {
                    sm: "flex-start",
                    md: "center",
                    lg: "center",
                  },
                }}
              >
                <TextField
                  select
                  label="Select College"
                  name="college"
                  variant="standard"
                  value={formik.values.college}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.college && Boolean(formik.errors.college)
                  }
                  helperText={formik.touched.college && formik.errors.college}
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                >
                  <CustomMenuItem value="">
                    <em>None</em>
                  </CustomMenuItem>
                  {colleges.map((option, index) => (
                    <CustomMenuItem key={index} value={option.value}>
                      {option.value}
                    </CustomMenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Course/Program"
                  name="course"
                  variant="standard"
                  value={formik.values.course}
                  onChange={formik.handleChange}
                  error={formik.touched.course && Boolean(formik.errors.course)}
                  helperText={formik.touched.course && formik.errors.course}
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                >
                  <CustomMenuItem value="">
                    <em>None</em>
                  </CustomMenuItem>
                  {course.map((option, index) => (
                    <CustomMenuItem key={index} value={option.value}>
                      {option.value}
                    </CustomMenuItem>
                  ))}
                </TextField>
              </Box>
              <Box
                className="signup_row"
                sx={{
                  display: "flex",
                  gap: { xs: "20px", md: "0px" },
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                  },
                  justifyContent: {
                    sm: "flex-start",
                    md: "space-between",
                    lg: "space-between",
                  },
                  alignItems: {
                    sm: "flex-start",
                    md: "center",
                    lg: "center",
                  },
                }}
              >
                <TextField
                  select
                  label="Preferred Hostel"
                  name="hostel"
                  variant="standard"
                  value={formik.values.hostel}
                  onChange={formik.handleChange}
                  error={formik.touched.hostel && Boolean(formik.errors.hostel)}
                  helperText={formik.touched.hostel && formik.errors.hostel}
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                >
                  <CustomMenuItem value="">
                    <em>None</em>
                  </CustomMenuItem>
                  {hostel.map((option, index) => (
                    <CustomMenuItem key={index} value={option.value}>
                      {option.value}
                    </CustomMenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Room Preference"
                  name="roomType"
                  variant="standard"
                  value={formik.values.roomType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.roomType && Boolean(formik.errors.roomType)
                  }
                  helperText={formik.touched.roomType && formik.errors.roomType}
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
                  }}
                >
                  <CustomMenuItem value="">
                    <em>None</em>
                  </CustomMenuItem>
                  {roomType.map((option, index) => (
                    <CustomMenuItem key={index} value={option.value}>
                      {option.value}
                    </CustomMenuItem>
                  ))}
                </TextField>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    color="primary"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                  />
                }
                label="I agree to the terms and conditions"
              />
              {formik.touched.terms && formik.errors.terms && (
                <Typography variant="caption" color="error">
                  {formik.errors.terms}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                sx={{
                  textTransform: "unset",
                  marginTop: "10px",
                  fontSize: "16px",
                  letterSpacing: "0.7px",
                }}
              >
                Create Account
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
                  Already have an account?
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  sx={{ cursor: "pointer", color: "#797979" }}
                  onClick={handleButtonClick}
                >
                  Log in
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </CSSTransition>
  );
};

export default Registration;
