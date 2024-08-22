import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { FaLightbulb, FaBed } from "react-icons/fa";
import theme from "../../theme/theme";
import logo from "../../assets/Images/landing page/hms2.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  pathUrl,
}) => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/^\//, "");
    setActive(path);
  }, [location.pathname]);

  const navItems = [
    {
      text: "Dashboard",
      icon: <BsFillFileBarGraphFill />,
      to: `${pathUrl}/dashboard`,
    },
    {
      text: "Profile",
      icon: <MdAccountCircle />,
      to: `${pathUrl}/studentprofiles`,
    },
    {
      text: "Fees",
      icon: <FaFileInvoice />,
      to: `${pathUrl}/fees`,
    },
    {
      text: "Announcements",
      icon: <HiSpeakerphone />,
      to: `${pathUrl}/announcement`,
    },
    {
      text: "Virtual Suggestion Box",
      icon: <FaLightbulb />,
      to: `${pathUrl}/suggestions`,
    },
    {
      text: "Rooms",
      icon: <FaBed />,
      to: `${pathUrl}/rooms`,
    },
  ];

  const checkActive = (to) => {
    return location.pathname.includes(to);
  };

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          transition: "width 0.3s ease-in-out",
          "& .MuiPaper-root": {
            color: "white",
            backgroundColor: theme.primary,
            boxSizing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Box width="100%">
          <Box ml="1.5rem" mt="1rem" position="relative">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                width="120px"
              >
                <img src={logo} alt="" />
              </Box>
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ChevronLeft
                  sx={{
                    color: theme.primary,
                    fontSize: "2rem",
                    background: "white",
                    borderRadius: "50px",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <List
            sx={{
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map(({ text, icon, to }) => {
              const isActive = checkActive(to);

              return (
                <ListItem key={text} disablePadding>
                  <Tooltip title={text} arrow placement="right">
                    <ListItemButton
                      onClick={() => {
                        navigate(to);
                        setActive(to);
                      }}
                      sx={{
                        backgroundColor: isActive ? "white" : "transparent",
                        color: isActive ? theme.primary : "white",
                        borderRadius: "50px",
                        paddingLeft: isActive ? "3rem" : "2rem",
                        paddingRight: "2rem",
                        marginInline: "10px",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: isActive ? "white" : "transparent",
                        },
                        transform: isActive ? "scale(1.03)" : "scale(1)",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "45px",
                          color: isActive ? theme.primary : "white",
                          fontSize: "1.4rem",
                          marginLeft: "0.5rem", // Adjusted margin for icon alignment
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          sx: {
                            whiteSpace: "nowrap", // Prevent text wrap
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                        primary={text}
                      />
                      {isActive && <ChevronRightOutlined />}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
