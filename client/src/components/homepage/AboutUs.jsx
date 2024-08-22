import missionImage from "../../assets/Images/landing page/full10.webp"; // replace with the actual path
import storyImage from "../../assets/Images/landing page/full01.webp"; // replace with the actual path

const AboutUs = () => {
  return (
    <div id="about-us" className="md:p-8 pt-12 relative">
      <div className="mx-auto relative z-[19]">
        {/* Heading  */}
        <div
          data-aos="fade-left"
          className="flex flex-col items-center justify-center w-full min-h-[20vh] sm:h-[20vh] md:h-[30vh] lg:h-[40vh] mb-8 "
        >
          <div className="h-full p-8 md:p-4 w-full md:w-1/2 flex flex-col justify-center text-center items-center rounded-2xl shadow-2xl  bg-primary">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">
              About DormMate
            </h2>
            <p className="text:sm sm:text-base text-[#ccccccc7] w-[90%] ">
              Innovating hostel living with top service and a focus on
              sustainability and community.
            </p>
          </div>
        </div>
        {/* Sections  */}
        <div className="max-w-screen flex flex-col items-center justify-center">
          {/* Our Mission  */}
          <div className="flex flex-col w-[90%] mt-16 gap-8 md:flex-row items-center">
            <div
              className="md:w-1/2 md:mb-0 order-1 flex flex-col items-start justify-center gap-6"
              data-aos="fade-in"
            >
              <h3 className="text-4xl font-black mb-4 text-heading">
                Our Mission
              </h3>
              <p className="text-lg text-text">
                At DormMate, our mission is to make staying in hostels simple
                and fun. We always look for new ways to improve how hostels work
                and to keep our guests happy. We make sure everyone feels
                comfortable and well taken care of during their stay. We care
                about our planet and use eco-friendly practices to help protect
                it. We also love bringing people together so they can share
                experiences and enjoy their time. Join us at DormMate, where we
                make hostels better for everyone.
              </p>
            </div>

            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 order-2  flex justify-center md:justify-end md:translate-x-[20px]">
              <img
                src={missionImage}
                alt="Our Mission"
                className="md:w-[400px] md:h-[400px] object-cover md:rounded-full rounded-lg"
                data-aos="fade-in"
              />
            </div>
          </div>
          {/* Our Story */}
          <div className="flex flex-col w-[90%] mt-16 gap-8 md:flex-row items-center justify-between ">
            <div className="md:w-1/2 md:pr-8 md:mb-0 order-2 flex justify-center md:justify-start md:translate-x-[20px] ">
              <img
                src={storyImage}
                alt="Our Story"
                className="md:w-[400px] md:h-[400px] w-[400px] h-[250px] object-cover md:rounded-full rounded-lg"
                data-aos="fade-in"
              />
            </div>
            <div
              className="md:w-1/2 md:pl-8 mb-8 md:mb-0 order-1 md:order-2 flex flex-col items-start justify-center gap-6"
              data-aos="fade-in"
            >
              <h3 className="text-4xl font-bold text-heading">Our Story</h3>
              <p className="text-lg text-text">
                Our story began with a simple idea: to make hostel stays better
                for everyone. We noticed that many hostels needed better systems
                to keep guests happy and comfortable. So, we created DormMate to
                solve these problems. With a passion for travel and a dedication
                to service, we built a platform that makes managing hostels easy
                and enjoyable. Along the way, we met amazing people and formed a
                strong community. We learned from each experience and kept
                improving. Today, DormMate is trusted by many hostels and loved
                by guests all around. Join us as we continue to grow and
                innovate in the world of hostel management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
