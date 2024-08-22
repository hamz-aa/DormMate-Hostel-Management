import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../../assets//Images/Registration form/hms2.svg";
import theme from "../../theme/theme";

const Footer = () => {
  return (
    <footer
      className="text-white p-4 text-center"
      style={{ background: theme.primary }}
    >
      <div className="flex container px-6 py-6 mx-auto ">
        <div className=" grid grid-cols-1 gap-10 md:justify-items-center sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 m-auto">
          <div className="flex w-full h-full flex-col">
            <div>
              <img className="" src={logo} alt="" />
            </div>
            <div>
              <p className="md:pl-10 text-md lg:text-2xl md:text-start">
                Unite in Comfort, <br /> Thrive in Community
              </p>
            </div>
          </div>
          <hr className=" text-gray-500 lg:hidden" />

          {/* Quick Links Column */}
          <div className="md:mt-[4rem] flex flex-col space-y-3 md:text-left w-full h-full justify-start md:pl-10 gap-3">
            <div>
              <h1 className=" font-bold max-w-lg tracking-tight text-sm text-footerGray md:text-left cursor-default">
                Services
              </h1>
            </div>
            <div>
              <a className="text-left cursor-pointer md:text-lg text-sm text-white transition-colors duration-300 dark:text-white">
                Accommodation
              </a>
            </div>
            <div>
              <a className="text-left cursor-pointer md:text-lg text-sm text-white transition-colors duration-300 dark:text-white">
                Dining Options
              </a>
            </div>
            <div>
              <a className="text-left cursor-pointer md:text-lg text-sm text-white transition-colors duration-300 dark:text-white">
                HouseKeeping Services
              </a>
            </div>
            <div>
              <a className="text-left cursor-pointer md:text-lg text-sm text-white transition-colors duration-300 dark:text-white">
                Security
              </a>
            </div>
            <div>
              <a className="text-left cursor-pointer md:text-lg text-sm text-white transition-colors duration-300 dark:text-white">
                Events and Activities
              </a>
            </div>
          </div>
          <hr className=" text-gray-500 lg:hidden" />

          {/* Follow Us Column */}
          <div className="md:mt-[4rem] flex flex-col space-y-3 md:text-left w-full h-full justify-start md:pl-10 gap-3">
            <div>
              <h1 className=" font-bold max-w-lg tracking-tight text-sm text-footerGray md:text-left cursor-default">
                Follow Us
              </h1>
            </div>
            <div>
              <a
                className="flex items-center gap-2 md:text-lg text-sm md:justify-normal justify-center"
                href=""
              >
                <FaFacebook />
                <p>Facebook</p>
              </a>
            </div>
            <div>
              <a
                className="flex items-center gap-2 md:text-lg text-sm md:justify-normal justify-center"
                href=""
              >
                <FaTwitter />
                <p>Twitter</p>
              </a>
            </div>
            <div>
              <a
                className="flex items-center gap-2 md:text-lg text-sm md:justify-normal justify-center"
                href=""
              >
                <FaInstagram />
                <p>Instagram</p>
              </a>
            </div>
            <div>
              <a
                className="flex items-center gap-2 md:text-lg text-sm md:justify-normal justify-center"
                href=""
              >
                <FaLinkedin />
                <p>Linkedin</p>
              </a>
            </div>
          </div>
          <hr className=" text-gray-500 lg:hidden" />

          {/* Contact Us column */}
          <div className="md:mt-[4rem] flex flex-col space-y-3 text-left w-full h-full justify-start md:pl-10 gap-3">
            <div>
              <h1 className=" font-bold max-w-lg tracking-tight text-sm text-footerGray md:text-left text-center cursor-default">
                Contact Us
              </h1>
            </div>
            <div>
              <a
                className="md:text-lg text-sm md:text-start text-center"
                href=""
              >
                <p>dormmate@hostel.com</p>
              </a>
            </div>
          </div>
          <hr className=" text-gray-500 lg:hidden" />
        </div>
      </div>
      <p className="text-footerGray mt-6">
        © 2024 DormMate. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
