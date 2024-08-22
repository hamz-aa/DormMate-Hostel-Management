import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
import ErrorPage from "../../resources/ErrorPage";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "../../resources/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DataNotFound from "../../resources/DataNotFound";

const Announcement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [readStatus, setReadStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(9);
  const dialogRef = useRef(null);

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.announcements);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (modalOpen && dialogRef.current) {
      if (dialogRef.current.open) {
        dialogRef.current.show();
      } else {
        dialogRef.current.showModal();
      }
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [modalOpen]);

  const openModal = (announcementId) => {
    const announcement = filteredAnnouncements.find(
      (item) => item._id === announcementId
    );
    setSelectedAnnouncement(announcement);
    setReadStatus(
      readStatus.map((status, i) =>
        items[i]._id === announcementId ? true : status
      )
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const filteredAnnouncements = items.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const totalPages = Math.ceil(
    filteredAnnouncements.length / announcementsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h3 className="text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Announcements
      </h3>
      <div className="bg-dashboardSecondary shadow-lg main md:min-h-[70vh] min-h-[50vh] mt-5 mr-6 rounded-lg flex flex-col p-4 gap-6">
        {/* Search functionality */}
        <div className="relative w-full flex items-center justify-start">
          <form className="w-72 ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full py-3 px-4 pr-10 pl-10 text-sm text-gray-900 shadow-lg rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Search Announcements"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                required
              />
            </div>
          </form>
        </div>
        {/* Announcement Cards */}
        <div
          className="main md:min-h-[70vh] min-h-[50vh] sm:mr-6 rounded-lg grid gap-[50px]"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {status === "loading" ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-between w-full h-[30vh] min-w-[280px] bg-[#f5f5f5] text-white p-4 rounded-2xl"
              >
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton
                  variant="rectangular"
                  height={60}
                  style={{ marginTop: 8 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  style={{ marginTop: 8 }}
                />
              </div>
            ))
          ) : currentAnnouncements.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              <DataNotFound />
            </div>
          ) : (
            currentAnnouncements.map((announcement) => {
              const announcementDate = new Date(
                announcement.date
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const isLongTitle = announcement.title.length > 30;
              const titleDisplay = isLongTitle
                ? `${announcement.title.slice(0, 30)}...`
                : announcement.title;

              return (
                <div
                  key={announcement?._id}
                  className="flex flex-col justify-between w-full h-max min-w-[280px] bg-dashboardPrimary text-white p-4 rounded-2xl"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-0 justify-between h-full">
                      <h3
                        className="text-base font-semibold text-ellipsis overflow-hidden  w-[60%] whitespace-nowrap"
                        title={announcement.title}
                      >
                        {titleDisplay}
                      </h3>
                      <p
                        className="text-announcementCard text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {announcementDate}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex-grow">
                      <p className="announcement-description text-sm text-announcementCard mb-4 h-full">
                        {announcement.description}
                      </p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <button
                        onClick={() => openModal(announcement._id)}
                        className="w-fit bg-white text-primary hover-light rounded-full px-2 py-1.5"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Pagination Controls */}
        {filteredAnnouncements.length > 9 && (
          <div className="flex justify-center mt-20 md:mr-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 w-10 h-10 py-2 mx-1 rounded-full text-heading ${
                currentPage === 1
                  ? " text-text cursor-not-allowed"
                  : "  hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 mx-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-dashboardPrimary text-white"
                    : "bg-gray-200 text-text hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 px-2 py-2 mx-1 rounded-full text-heading ${
                currentPage === totalPages
                  ? " text-text cursor-not-allowed"
                  : " hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
        {/* Modal */}
        {modalOpen && selectedAnnouncement && (
          <>
            <div
              className="modal-backdrop fixed inset-0 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="modal-content bg-white rounded-2xl shadow-lg z-10 w-[30rem]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-dashboardPrimary min-h-[10vh] w-full flex items-end p-4 text-white justify-between rounded-t-2xl">
                  <h3 className="text-2xl text-white font-semibold w-[75%]">
                    {selectedAnnouncement.title}
                  </h3>
                  <p
                    className="text-contactGray text-lg"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {new Date(selectedAnnouncement.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="w-full flex flex-col items-start justify-center p-6">
                  <p className="text-text text-lg">
                    {selectedAnnouncement.description}
                  </p>
                  <div className="flex items-center h-max justify-end w-full pt-4">
                    <button
                      onClick={closeModal}
                      className="bg-white text-dashboardPrimary border border-dashboardPrimary w-24 h-12 rounded-full hover:bg-dashboardPrimary hover:text-white transition-all"
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <style>{`
        .modal-backdrop {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.5);
        }
      `}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default Announcement;
