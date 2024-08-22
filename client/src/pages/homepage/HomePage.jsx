import AOS from "aos";
import "aos/dist/aos.css";
import About from "../../components/homepage/AboutUs";
import Intro from "../../components/homepage/Intro";
import Info from "../../components/homepage/Info";
import Budget from "../../components/homepage/Budget";
import Contact from "../../components/homepage/ContactUs";
import Navbar from "../../components/homepage/Navbar";
import Footer from "../../components/homepage/Footer";
import OurPhotos from "../../components/homepage/OurPhotos";

import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Intro />
      <Info />
      <Budget />
      <About />
      <OurPhotos />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
