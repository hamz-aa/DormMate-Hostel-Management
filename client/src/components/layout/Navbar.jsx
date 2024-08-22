// src/components/Navbar.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import theme from "../../theme/theme";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = ({ name, isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShouldNavigate(true);
    handleMenuClose();
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/auth");
    }
  }, [shouldNavigate, navigate]);

  const notifications =
    name === "Admin"
      ? ["3 students have requested rooms"]
      : ["Your room request has been approved"];

  const currentDateTime = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.navGray,
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: isSidebarOpen ? "calc(100vw - 280px)" : "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!isSidebarOpen && (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            p="0.1rem 1.5rem"
          >
            <Typography color={theme.navTextPrimary}>
              Welcome, {name === "Admin" ? "Admin" : "Student"}
            </Typography>
            <Typography color={theme.navTextSecondary} fontSize={"0.8rem"}>
              {currentDateTime}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationsClose}
            sx={{ mt: "4px" }}
          >
            <List>
              {notifications.map((notification, index) => (
                <ListItem className="cursor-default" key={index}>
                  <ListItemText primary={notification} />
                </ListItem>
              ))}
            </List>
          </Menu>
          <button
            className="scale-100 hover:scale-110 transition-all duration-200"
            onClick={handleMenuOpen}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[#E8E9ED] rounded-full transition-all">
              <FontAwesomeIcon
                icon={faUser}
                color="#34495E"
                className="text-xl"
              />
            </div>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: "4px" }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: "8px", color: "#334E6C" }} />
              <span className="text-heading">Logout</span>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
