import theme from "../../theme/theme";
import sectionImg from "../../assets/Images/landing page/full10.webp";
import hostel from "../../assets/Images/landing page/Icons/Hostel.svg";
import Key from "../../assets/Images/landing page/Icons/Key.svg";
import appreciate from "../../assets/Images/landing page/Icons/appreciate.svg";
import user from "../../assets/Images/landing page/roomreview02.webp";
import star from "../../assets/Images/landing page/Star.svg";

function Budget() {
  return (
    <div
      data-aos="fade-out"
      className="container flex mt-[6rem] items-center justify-center py-6 relative z-[19]"
    >
      <div className="w-screen h-full flex-col-reverse md:flex-row flex py-6 items-center justify-center">
        {/* Img Section  */}
        <div className="md:w-[50%] w-full h-[60vh] md:h-[80vh] md:pl-10 relative mt-10 md:mt-0 flex justify-center items-center">
          <img
            src={sectionImg}
            alt=""
            className="rounded-lg w-[90%] md:w-[80%] h-full md:h-[90%] object-cover mx-auto"
          />

          {/* Review Card  */}
          <div className="flex flex-col items-start justify-center absolute bottom-0 right-2 h-[26vh] w-[95%] md:w-[50%] bg-white shadow-md rounded-lg p-4">
            <div className="w-full h-auto flex items-start justify-center">
              <h2 className="font-semibold text-base text-center text-primary">
                This is the perfect hostel for a weekend getaway!
              </h2>
            </div>
            <div className="flex items-start justify-center h-10 w-full rounded-full mt-2">
              <img
                className="w-auto h-auto object-cover rounded-full"
                src={user}
                alt=""
              />
              <div className="stars p-2 flex gap-1">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* accommodation Section  */}
        <div className="md:w-[50%] w-full">
          <h4 className="text-4xl font-black px-6 py-3 text-heading">
            Find suitable budget <br /> accommodation
          </h4>
          <p className="md:py-1 px-6 w-[85%] text-text">
            Easily find affordable and comfortable living options with{" "}
            <span className="font-bold">DormMate</span>. Get the best value
            without compromising on quality.
          </p>
          <div className="grid grid-cols-1 gap-[1rem] p-5">
            {/* 1 */}
            <div className="w-full flex items-center justify-start gap-4">
              <div className="min-w-[70px] h-[70px] flex items-center justify-center rounded-lg bg-heading">
                <img src={hostel} alt="" className="w-[25px]" />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3 className="text-base font-bold text-heading">
                  Hostel Territory
                </h3>
                <p className="text-sm font-normal w-[60%] text-text">
                  Discover the hostel&apos;s surroundings and amenities.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="w-full flex items-center justify-start gap-4">
              <div className="min-w-[70px] h-[70px] flex items-center justify-center rounded-lg bg-heading">
                <img src={Key} alt="" className="w-[25px]" />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3 className="text-base font-bold text-heading">
                  Accommodates guests
                </h3>
                <p className="text-sm font-normal w-[60%] text-text">
                  Accommodates guests with comfort and hospitality.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="w-full flex items-center justify-start gap-4">
              <div className="min-w-[70px] h-[70px] flex items-center justify-center rounded-lg bg-heading">
                <img src={appreciate} alt="" className="w-[25px]" />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3 className="text-base font-bold text-heading">
                  Grateful guests
                </h3>
                <p className="text-sm font-normal w-[60%] text-text">
                  Appreciative guests express their gratitude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
