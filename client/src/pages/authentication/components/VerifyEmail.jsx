import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AuthForm.css";
import * as yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

const verificationValidationSchema = yup.object({
  verificationCode: yup
    .string()
    .length(6, "Verification code must be 6 digits")
    .required("Verification code is required"),
});

function VerificationEmail() {
  const [initialEmail, setInitialEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("verificationEmail");
    if (email) {
      setInitialEmail(email);
    }
  }, []);

  const formikVerification = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: verificationValidationSchema,
    onSubmit: (values) => {
      verificationHandleSubmit(values);
    },
  });

  const verificationHandleSubmit = async (values) => {
    try {
      // Send verification code
      await axios.post("http://localhost:8000/verify-email", {
        email: initialEmail,
        verificationCode: values.verificationCode,
      });
      alert("Email successfully verified.");
      navigate("/auth/login"); // Redirect to login page or other page after verification
    } catch (error) {
      console.error("There was an error verifying the email!", error);
      alert(
        "Invalid verification code or an error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute inset-0 shadow-lg overflow-auto">
      <div className="flex flex-col items-center justify-center w-full h-screen">
        {/* Verification Email Form */}
        <div className="form w-full max-w-md p-6 flex flex-col items-center justify-center gap-4 border-4 border-gray-400">
          {/* Title */}
          <div className="Title flex items-center justify-center h-[10vh]">
            <span className="font-extrabold text-2xl text-heading">
              Verify Your Email
            </span>
          </div>
          {/* Form */}
          <form
            onSubmit={formikVerification.handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              align="center"
              gutterBottom
            >
              We have sent a verification code to your email. Please enter the
              6-digit code below to verify your email address.
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <FormControl
                fullWidth
                variant="standard"
                error={
                  formikVerification.touched.verificationCode &&
                  Boolean(formikVerification.errors.verificationCode)
                }
              >
                <InputLabel htmlFor="standard-adornment-verification-code">
                  Verification Code
                </InputLabel>
                <Input
                  id="standard-adornment-verification-code"
                  name="verificationCode"
                  type="text"
                  value={formikVerification.values.verificationCode}
                  onChange={formikVerification.handleChange}
                />
                {formikVerification.touched.verificationCode &&
                  formikVerification.errors.verificationCode && (
                    <Typography variant="caption" color="error">
                      {formikVerification.errors.verificationCode}
                    </Typography>
                  )}
              </FormControl>
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
                Verify Email
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationEmail;
