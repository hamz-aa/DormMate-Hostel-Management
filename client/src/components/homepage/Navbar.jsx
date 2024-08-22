import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/landing page/hms2.svg";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-scroll";
import theme from "../../theme/theme";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleGetStartedClick = () => {
    navigate("/auth");
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !drawerOpen) {
        setShow("-translate-y-[100px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <AppBar
        position="fixed"
        className={`transition-transform duration-300 ${show}`}
        sx={{
          background: "#0A2640",
          boxShadow: "none",
          zIndex: "20",
          width: "100%",
          transition:'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
        }}
      >
        <Toolbar
          className="flex justify-between relative w-full"
          sx={{ backgroundColor: "transparent" }}
          data-aos="fade-in"

        >
          <div className="h-24 w-24 flex items-center justify-center">
            <img
              src={logo}
              alt="Hostel Management Logo"
              className="h-full w-full object-cover text-xl"
            />
          </div>
          <div className="hidden sm:flex space-x-4">
            <Button color="inherit" className="cursor-pointer underline-animation">
              <Link to="intro" smooth={true} duration={1000}>
                Home
              </Link>
            </Button>
            <Button color="inherit" className="cursor-pointer underline-animation">
              <Link to="about-us" smooth={true} duration={1000}>
                About Us
              </Link>
            </Button>
            <Button color="inherit" className="cursor-pointer underline-animation">
              <Link to="contact-us" smooth={true} duration={1000}>
                Contact Us
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                backgroundColor: "#ffffff",
                paddingX: "1.5rem", // px-6
                paddingY: "0.5rem", // py-2
                borderRadius: "30px", // rounded-lg
                color: "#0A2640", // text-white
                border: "1px solid #0A2640",
                "&:hover": {
                  backgroundColor: "#0A2640", // hover:bg-blue-800
                  color: "#fff",
                  border: "1px solid #fff",
                  transition: "background-color 0.2s", // duration-300
                },
              }}
            >
              <Link onClick={handleGetStartedClick} to="/auth" smooth={true} duration={1000}>
                Get Started
              </Link>
            </Button>
          </div>

          {/* for mobile screen */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="md:hidden"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <List className="w-60">
            <ListItem>
              <ListItemText>
                <Link
                  to="intro"
                  smooth={true}
                  duration={1000}
                  onClick={toggleDrawer}
                  className="underline-animation cursor-pointer"
                >
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link
                  to="about-us"
                  smooth={true}
                  duration={1000}
                  onClick={toggleDrawer}
                  className="underline-animation cursor-pointer"
                >
                  About Us
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link
                  to="contact-us"
                  smooth={true}
                  duration={1000}
                  onClick={toggleDrawer}
                  className="duration-500 underline-animation cursor-pointer"
                >
                  Contact Us
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <button className="bg-blue-950 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-800 duration-300 hover:text-black">
                  SIGN UP
                </button>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      }
    </>
  );
};

export default Navbar;
