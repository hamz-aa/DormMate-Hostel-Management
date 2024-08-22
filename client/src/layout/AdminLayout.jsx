import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/SideBar";

const AdminLayout = ({ name }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);

  return (
    <Box
      sx={{ transition: "all 0.3s ease-in-out" }}
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      height="100%"
    >
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="280px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        pathUrl={"admin"}
      />
      <Box flexGrow={1}>
        <Navbar
          name={name}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          // setIsLoggedIn={setIsLoggedIn}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
