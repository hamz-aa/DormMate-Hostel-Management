import theme from "../../theme/theme";
import location from "../../assets/Images/landing page/Icons/Location.svg";
import luggage from "../../assets/Images/landing page/Icons/Luggage.svg";
import parking from "../../assets/Images/landing page/Icons/Parking.svg";
import wifi from "../../assets/Images/landing page/Icons/Wifi.svg";
import sectionImg from "../../assets/Images/landing page/full10.webp";
import graph from "../../assets/Images/landing page/graph.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate("/auth");
  };
  return (
    <div
      data-aos="fade-out"
      className="container mx-auto flex items-center justify-center min-h-screen mt-2"
    >
      <div className="flex flex-col lg:flex-row w-[95%] h-full justify-center items-center md:justify-between py-6 lg:p-12 rounded-lg relative">
        <div className="lg:w-[55%] w-full relative z-[19]">
          <h4 className="text-3xl md:text-4xl font-black px-6 py-3 md:w-[80%] text-left text-heading">
            We have everything you need
          </h4>
          <p className="md:py-4 px-6 text-left lg:w-[85%] text-text">
            <span className="font-bold">DormMate</span> offers seamless room
            assignments, automated billing, maintenance tracking, and robust
            security. Enjoy free high-speed WiFi, a central location, free
            luggage storage, and allocated parking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5rem] p-5 w-full">
            <div className="flex justify-start items-center gap-5 h-16 md:h-14">
              <img src={wifi} alt="Wifi" className="w-[25px]" />
              <p className="text-md w-auto text-secondary">
                Free high-speed WiFi available
              </p>
            </div>
            <div className="flex justify-start items-center gap-5 h-16 md:h-14">
              <img src={location} alt="Location" className="w-[25px]" />
              <p className="text-md w-auto text-secondary">
                Convenient location in the center
              </p>
            </div>
            <div className="flex justify-start items-center gap-5 h-16 md:h-14">
              <img src={luggage} alt="Luggage" className="w-[25px]" />
              <p className="text-md text-secondary">Free storage of luggage</p>
            </div>
            <div className="flex justify-start items-center gap-5 h-16 md:h-14">
              <img src={parking} alt="Parking" className="w-[25px]" />
              <p className="text-md text-secondary">
                Parking place allocated to you
              </p>
            </div>
            <div className="md:mt-7 w-full mt-3 flex flex-wrap gap-4 items-center justify-start">
              <Link
                onClick={handleBookNowClick}
                className="text-white border border-white  py-2 px-6 rounded-full hover bg-primary"
              >
                Book Now
              </Link>
              <Link
                to="about-us"
                smooth={true}
                duration={1000}
                className=" border py-2 px-4 rounded-full cursor-pointer border-primary text-secondary hover:bg-primary hover:text-white transition-all duration-300"
              >
                More About ...
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[45%] h-[40vh] sm:h-[70vh] md:h-[80vh] md:pl-10 relative mt-10 lg:mt-0 flex justify-center ">
          <img
            src={sectionImg}
            alt="Section"
            className="rounded-lg w-full h-full object-cover"
          />
          <img
            src={graph}
            alt="Graph"
            className="absolute md:top[0%] top-[110%] md:left-[60%] left-[80%] h-[60%] sm:h-[50%] md:h-[60%] md:w-auto"
            style={{ transform: "translate(-50%, -60%)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
