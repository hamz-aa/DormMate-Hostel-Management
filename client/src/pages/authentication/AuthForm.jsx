import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";

const AuthForm = () => {
  const [showSignup, setShowSignup] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // const isAdmin = localStorage.getItem("isAdmin") === "true";

  //   if (isLoggedIn) {
  //     if (isAdmin) {
  //       navigate("/admin/dashboard");
  //     } else {
  //       navigate("/student/dashboard");
  //     }
  //   }
  // }, [navigate]);

  const handleToggleForm = () => {
    setShowSignup(!showSignup);
  };
  const handleButtonClick = () => {
    handleToggleForm();
  };

  return (
    <>
      {/* Signup or Signin Container */}
      <div
        className={`registration flex items-center justify-center sm:bg-white lg:bg-primary min-h-screen min-w-screen relative`}
      >
        {/* Signup Container */}
        <Registration
          showSignup={showSignup}
          handleButtonClick={handleButtonClick}
        />

        {/* Signin Container  */}
        <Login
          // setIsAdmin={setIsAdmin}
          // setIsLoggedIn={setIsLoggedIn}
          showSignup={showSignup}
          handleButtonClick={handleButtonClick}
          handleToggleForm={handleToggleForm}
        />
      </div>
    </>
  );
};

export default AuthForm;
