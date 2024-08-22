import "./styles/fonts.css";
import "./styles/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import { ThemeProvider, createTheme } from "@mui/material";
import AuthForm from "./pages/Authentication/AuthForm.jsx";
import { useState, useEffect } from "react";
import AdminAnnouncement from "./pages/adminDashboard/Announcement";
import AdminRooms from "./pages/adminDashboard/Rooms";
import AdminStudentProfile from "./pages/adminDashboard/StudentProfile";
import AdminStudents from "./pages/adminDashboard/Students";
import AdminSuggestionBox from "./pages/adminDashboard/SuggestionBox";
import AdminFees from "./pages/adminDashboard/Fees";
import FeesDetail from "./pages/adminDashboard/FeesDetail"; // Import the new component
import StudentAnnouncement from "./pages/studentDashboard/Announcement";
import StudentRooms from "./pages/studentDashboard/Rooms";
import StudentProfile from "./pages/studentDashboard/Profile";
import StudentSuggestionBox from "./pages/studentDashboard/VirtualSuggestionBox";
import StudentFees from "./pages/studentDashboard/Fees";
import StudentLayout from "./layout/StudentLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import FeeHistory from "./pages/adminDashboard/FeeHistory";
import StudentDashboard from "./pages/studentDashboard/StudentDashboard";
import RoomRequest from "./pages/adminDashboard/RoomRequest";
import VerifyEmail from "./pages/Authentication/components/VerifyEmail.jsx";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RoomDetail from "./pages/adminDashboard/RoomDetail.jsx";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#0A2640",
      dark: "#0A2640",
      contrastText: "#E5E5E5",
      white: "#fff",
    },
    dashboardPrimary: {
      light: "#757ce8",
      main: "#34495E",
      white: "#fff",
      contrastText: "#E5E5E5",
    },
    secondary: {
      light: "#9d9d9d",
      main: "#9d9d9d",
      dark: "#9d9d9d",
      contrastText: "#000",
    },
  },
});

const App = () => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, isAdmin, isLoggedIn, status, error } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  // const adminStatus = localStorage.getItem("isAdmin") === "true";
  // const loginStatus = localStorage.getItem("isLoggedIn") === "true";

  // setIsAdmin(adminStatus);
  // setIsLoggedIn(loginStatus);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       "http://localhost:8001/api/announcements/all",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/auth"
            element={
              isLoggedIn ? (
                isAdmin ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/student/dashboard" />
                )
              ) : (
                <AuthForm
                // setIsAdmin={setIsAdmin}
                // setIsLoggedIn={setIsLoggedIn}
                />
              )
            }
          />

          <Route path="auth/verify-email" element={<VerifyEmail />} />
          {isLoggedIn && isAdmin ? (
            <Route
              element={
                <AdminLayout
                  name="Admin"
                  // setIsLoggedIn={setIsLoggedIn}
                />
              }
            >
              <Route
                exact
                path="admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route
                exact
                path="admin/announcement"
                element={<AdminAnnouncement />}
              />
              <Route exact path="admin/rooms" element={<AdminRooms />} />
              <Route
                exact
                path="admin/rooms/:roomId"
                element={<RoomDetail />}
              />
              <Route
                exact
                path="admin/rooms/requests"
                element={<RoomRequest />}
              />
              <Route
                exact
                path="admin/studentprofiles"
                element={<AdminStudents />}
              />
              <Route
                exact
                path="admin/studentprofiles/:studentId"
                element={<AdminStudentProfile />}
              />
              <Route
                exact
                path="admin/studentprofiles/feesHistory/:studentId"
                element={<FeeHistory />}
              />
              <Route
                exact
                path="admin/suggestions"
                element={<AdminSuggestionBox />}
              />
              <Route path="admin/fees" element={<AdminFees />} />
              <Route path="admin/fees/:month/:year" element={<FeesDetail />} />
            </Route>
          ) : isLoggedIn && !isAdmin ? (
            <Route
              element={
                <StudentLayout
                  name="Student"
                  //  setIsLoggedIn={setIsLoggedIn}
                />
              }
            >
              <Route
                exact
                path="student/dashboard"
                element={<StudentDashboard />}
              />
              <Route
                exact
                path="student/announcement"
                element={<StudentAnnouncement />}
              />
              <Route
                exact
                path="student/studentprofiles"
                element={<StudentProfile />}
              />
              <Route exact path="student/rooms" element={<StudentRooms />} />
              <Route
                exact
                path="student/suggestions"
                element={<StudentSuggestionBox />}
              />
              <Route exact path="student/fees" element={<StudentFees />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/auth" />} />
          )}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
