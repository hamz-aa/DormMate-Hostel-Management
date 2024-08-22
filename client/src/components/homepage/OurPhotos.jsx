import { useState } from "react";
import image1 from "../../assets/Images/landing page/02.webp";
import image2 from "../../assets/Images/landing page/full02.webp";
import image3 from "../../assets/Images/landing page/full10.webp";
import image4 from "../../assets/Images/landing page/promo.webp";
import theme from "../../theme/theme";
import { Link } from "react-scroll";

const OurPhotos = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleShowLessClick = () => {
    setShowMore(false);
  };
  return (
    <div className="min-h-screen mt-16 relative z-[19]">
      <div className="max-w-7xl w-screen relative z-[19]">
        <div
          id="initial"
          className="mb-8 flex flex-wrap gap-4 justify-between items-center h-max w-full md:w-[80%] mx-auto p-4"
        >
          <div>
            <h2 className="text-4xl text-left font-bold text-heading">
              Photos of our rooms
            </h2>
          </div>
          <div className="md:w-[20vw]">
            <p className="text-base font-normal text-text w-3/4 md:w-full">
              Experience the Ultimate Comfort and Style in Our Rooms
            </p>
          </div>
        </div>
        {/* photos section  */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-0">
          {/* Initial photos */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/4 rounded-lg overflow-hidden">
              <img
                src={image1}
                alt="Room 1"
                className="w-full h-full object-cover rounded-lg smooth"
              />
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 flex flex-col gap-4">
              <div className="w-full h-1/2 rounded-lg overflow-hidden">
                <img
                  src={image2}
                  alt="Room 2"
                  className="w-full h-full object-cover rounded-lg smooth"
                />
              </div>
              <div className="w-full h-1/2 rounded-lg overflow-hidden">
                <img
                  src={image3}
                  alt="Room 3"
                  className="w-full h-full object-cover rounded-lg smooth"
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 rounded-lg overflow-hidden">
              <img
                src={image4}
                alt="Room 4"
                className="w-full h-full object-cover rounded-lg smooth"
              />
            </div>
          </div>

          {/* show more button */}
          {!showMore && (
            <div className="h-10  w-full flex items-center justify-center">
              <Link
                to="additional"
                smooth={true}
                duration={1000}
                className="h-full py-2 px-6 rounded-full cursor-pointer hover transition-all duration-300 bg-primary text-white"
                onClick={handleShowMoreClick}
              >
                More Photos
              </Link>
            </div>
          )}

          {/* Additional photos */}
          {showMore && (
            <div
              id="additional"
              className={`flex w-full h-auto lg:h-[70vh] flex-wrap gap-4 justify-center transition-opacity duration-500 relative z-[19] ${
                showMore ? "opacity-100 " : " opacity-0 pointer-events-none"
              }`}
              style={{
                overflow: "hidden",
                transition: "height 0.5s ease-out, opacity 0.5s ease-out",
              }}
            >
              <div className="w-full h-full sm:w-1/2 lg:w-1/4 rounded-lg overflow-hidden">
                <img
                  src={image3}
                  alt="Room 1"
                  className="w-full h-full object-cover rounded-lg smooth"
                />
              </div>
              <div className="w-full h-full sm:w-1/2 lg:w-1/4 flex flex-col gap-4">
                <div className="w-full h-1/2 rounded-lg overflow-hidden">
                  <img
                    src={image4}
                    alt="Room 2"
                    className="w-full h-full object-cover rounded-lg smooth"
                  />
                </div>
                <div className="w-full  h-1/2 rounded-lg overflow-hidden">
                  <img
                    src={image1}
                    alt="Room 3"
                    className="w-full h-full object-cover rounded-lg smooth"
                  />
                </div>
              </div>
              <div className="w-full h-full sm:w-1/2 lg:w-1/4 rounded-lg overflow-hidden">
                <img
                  src={image2}
                  alt="Room 4"
                  className="w-full h-full object-cover rounded-lg smooth"
                />
              </div>
            </div>
          )}

          <div className="w-full flex justify-center mt-4">
            {showMore && (
              <Link
                to="initial"
                smooth={true}
                duration={1000}
                className="h-full py-2 px-6 rounded-full cursor-pointer hover transition-all duration-300 bg-primary text-white"
                onClick={handleShowLessClick}
              >
                Show Less
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPhotos;
