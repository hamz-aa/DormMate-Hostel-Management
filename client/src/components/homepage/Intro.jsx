import hero01 from "../../assets/Images/landing page/hero.webp";
import hero02 from "../../assets/Images/landing page/02.webp";
import hero03 from "../../assets/Images/landing page/full02.webp";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/auth");
  };
  return (
    <div
      id="intro"
      className="md:h-screen flex flex-col md:flex-row overflow-hidden bg-primary relative z-[19]"
    >
      <div
        data-aos="fade-out"
        className="md:w-1/2 flex items-center justify-center py-10 md:p-10 h-full text-white relative z-[19]"
      >
        <div className="h-full flex flex-col items-center md:items-start justify-start p-10">
          <h1 className="md:text-4xl text-3xl font-light mb-4 leading-[3rem]">
            Welcome to <span className=" font-extrabold">DormMate</span> <br />{" "}
            Setting the Standard for <br /> Hostel Management
          </h1>
          <p className="md:text-base text-sm text-[#f1f1f1c1] text-left mt-2">
            Welcome to <span className="font-bold">DormMate</span>, where we
            redefine hostel management with unparalleled standards in
            hospitality and efficiency, ensuring seamless living experiences for
            every resident.
          </p>
          <div className="flex gap-x-4 mt-10 w-full">
            <Link
              to="about-us"
              smooth={true}
              duration={1000}
              className="border rounded-3xl px-3 md:px-8 py-3 font-extrabold hover-dark bg-white  text-primary"
            >
              Learn More
            </Link>
            {/* use here react router to route to sign in page,  it is not working */}
            <Link
              to="/auth"
              onClick={handleGetStartedClick}
              className=" hover rounded-3xl px-3 md:px-8 py-3  text-white font-extrabold hover:cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div
        className="md:w-1/2 h-1/2 md:h-full relative z-[19]"
        data-aos="fade-left"
      >
        <div className="image-container h-[50%] flex justify-center items-center">
          <div className="relative h-[70%] w-[80%] overlay rounded-xl overflow-hidden">
            <img
              src={hero01}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="image-container h-[40%] flex justify-center items-start gap-4 my-5 md:my-0">
          <div className="relative h-[80%] w-[35%] overlay rounded-xl overflow-hidden">
            <img
              src={hero02}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="relative h-[80%] w-[42%] overlay rounded-xl overflow-hidden">
            <img
              src={hero03}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
