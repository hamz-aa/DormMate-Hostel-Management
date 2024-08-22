import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const newsletter = e.target.newsletter.checked;

    const mailtoLink = `mailto:syedziashahgillani76@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(
      name
    )}%0AEmail:%20${encodeURIComponent(
      email
    )}%0AMessage:%20${encodeURIComponent(
      message
    )}%0ANewsletter%20Subscription:%20${newsletter ? "Yes" : "No"}`;

    window.location.href = mailtoLink;
  };

  return (
    <div
      id="contact-us"
      className="flex flex-col justify-center items-center w-full min-h-screen relative"
    >
      <div className="lg:h-[40vh] w-full md:w-1/2 flex flex-col justify-center text-center items-center rounded-2xl shadow-2xl mt-8 mb-8 py-10 p-4 bg-primary">
        <h2 className="md:text-4xl text-3xl font-black mb-4 text-white">
          Get in Touch with DormMate
        </h2>
        <p className="md:text-base text-sm text-[#cccccc] md:w-[80%] w-[70%]">
          Innovating hostel living with top service and a focus on
          sustainability and community.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen md:min-h-[130vh] mb-10 relative z-[19]">
        {/* Left side */}
        <div className="w-full md:w-1/2 h-auto h-100vh md:h-[130vh] flex justify-center md:justify-end items-center bg-contactGray md:ml-5 md:rounded-l-xl ">
          <div className="max-w-md w-full pt-20 pb-20 px-6 md:px-12 bg-theme.primary md:rounded-l-3xl shadow-md bg-primary">
            <h2 className="text-4xl text-white font-bold mb-5">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="w-full px-1 py-2 border-b border-gray-400 bg-transparent focus:outline-none text-white"
                  required
                  type="text"
                />
              </div>
              <div className="mb-4">
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-1 py-2 border-b border-gray-400 bg-transparent focus:outline-none text-white"
                  required
                  type="email"
                />
              </div>
              <div className="mb-4">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Message"
                  className="w-full resize-none px-1 py-2 border-b border-gray-400 bg-transparent focus:outline-none text-white"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-theme.primary focus:ring-theme.primary border-gray-300 rounded bg-transparent"
                />
                <label
                  htmlFor="newsletter"
                  className="ml-2 block text-sm text-white"
                >
                  I would like to receive newsletter
                </label>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="hover-dark border text-primary bg-white font-semibold px-4 py-2 rounded-full"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 h-auto md:h-[130vh] bg-theme.primary flex justify-center rounded-r-xl md:mr-5 md:justify-start items-center bg-primary">
          <div className="max-w-md w-full pt-20 pb-16 px-6 md:px-12 bg-white md:rounded-r-3xl shadow-md">
            <h2 className="text-4xl text-theme.primary font-bold mb-5 text-heading">
              Visit Us
            </h2>
            <div className="mb-6">
              <p className="text-theme.primary text-sm mb-2 text-text">
                Explore our location and see how easily you can reach us. We
                look forward to welcoming you and providing any assistance you
                need.
              </p>
              {/* Map Placeholder */}
              <div className="w-full mb-4 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098277!2d144.9537363153158!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577cf0503f3de7a!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1611817288278!5m2!1sen!2sau"
                  width="100%"
                  height="150"
                  style={{ borderRadius: "10px" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
              <div className="flex items-center mb-2 text-sm">
                <FaMapMarkerAlt className="text-secondary mr-2" />
                <p className=" text-text">Karachi, Pakistan</p>
              </div>
              <div className="flex items-center mb-2 text-sm">
                <FaPhoneAlt className="text-secondary mr-2" />
                <p className="text-theme.primary text-text">+92-301-2233444</p>
              </div>
              <div className="flex items-center mb-2 text-sm">
                <FaEnvelope className="text-secondary mr-2" />
                <p className="text-theme.primary text-text">
                  dormmate@hostel.com
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-4 justify-end">
              <a href="#" target="_self" rel="noopener noreferrer">
                <FaInstagram className="text-secondary text-2xl hover:text-pink-600 transition duration-300 ease-in-out transform hover:scale-110" />
              </a>
              <a href="#" target="_self" rel="noopener noreferrer">
                <FaTwitter className="text-secondary text-2xl hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110" />
              </a>
              <a href="#" target="_self" rel="noopener noreferrer">
                <FaFacebook className="text-secondary text-2xl hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110" />
              </a>
              <a href="#" target="_self" rel="noopener noreferrer">
                <FaYoutube className="text-secondary text-2xl hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
