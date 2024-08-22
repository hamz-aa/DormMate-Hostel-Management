import { useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import DataNotFound from "../../resources/DataNotFound";

import {
  fetchAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../../redux/slices/announcementSlice";
import { Skeleton } from "@mui/material";

const Announcement = () => {
  const dispatch = useDispatch();
  const {
    items: announcements,
    status,
    error,
  } = useSelector((state) => state.announcements);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const dialogRef = useRef(null);
  const createDialogRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 9;

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (modalOpen || isCreateModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalOpen, isCreateModalOpen]);

  const openModal = (index) => {
    setSelectedAnnouncement(announcements[index]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewTitle("");
    setNewDescription("");
  };

  const openDeleteModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleDeleteAnnouncement = () => {
    dispatch(deleteAnnouncement(selectedAnnouncement._id));
    closeDeleteModal();
  };

  const handleCreateAnnouncement = () => {
    const newAnnouncement = {
      title: newTitle,
      date: new Date().toLocaleDateString(),
      description: newDescription,
    };
    dispatch(createAnnouncement(newAnnouncement));
    closeCreateModal();
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const filteredAnnouncements = currentAnnouncements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h3 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Announcements
      </h3>
      <div className="bg-dashboardSecondary main min-h-[70vh] mr-0 sm:mr-6 rounded-lg p-4 relative">
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={openCreateModal}
            className="bg-dashboardPrimary text-white px-4 py-2 rounded-3xl"
          >
            Create Announcement
          </button>
          <p className="text-dashboardPrimary text-xl">
            Total Announcements: {announcements?.length}
          </p>
        </div>
        <hr className="border-b-1 border-y-dashboardText my-5 opacity-40" />

        <div className="relative w-full flex items-center justify-start my-6">
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

        <div
          className="grid gap-[20px] mt-10"
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
          ) : filteredAnnouncements.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              {/* No announcements found for "{searchQuery}" */}
              <DataNotFound />
            </div>
          ) : (
            filteredAnnouncements?.map((announcement, index) => {
              const announcementDate = new Date(
                announcement.date
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <div
                  key={announcement._id}
                  className="flex flex-col justify-between w-full h-max min-w-[280px] bg-dashboardPrimary text-white p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-0 justify-between h-full">
                    <h3
                      className="text-base font-semibold text-ellipsis overflow-hidden  w-[60%] whitespace-nowrap"
                      title={announcement.title}
                    >
                      {announcement.title}
                    </h3>
                    <p
                      className="text-announcementCard text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {announcementDate}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="h-full w-full">
                    <p className="announcement-description text-sm text-announcementCard mb-4 h-full">
                      {announcement.description}
                    </p>
                  </div>
                  <div
                    className="h-full flex justify-between items-center"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <button
                      onClick={() =>
                        openModal(indexOfFirstAnnouncement + index)
                      }
                      className="w-fit bg-white hover-light text-primary rounded-full px-2 py-1.5"
                    >
                      Read More
                    </button>
                    <span
                      onClick={() => openDeleteModal(announcement)}
                      className="bg-white text-dashboardPrimary hover-light w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                    >
                      <FaTrashAlt className="text-lg" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {announcements.length > 9 && (
          <div className="flex justify-center mt-10">
            <Pagination
              count={Math.ceil(announcements.length / announcementsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className="mt-4"
              color="dashboardPrimary"
            />
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal bg-white text-dashboardPrimary w-[30rem] min-h-[20vh] rounded-2xl">
            <div className="bg-dashboardPrimary h-[10vh] w-full flex items-center px-4 text-white justify-between rounded-t-2xl">
              <h3 className="text-xl">Confirm Deletion</h3>
            </div>
            <div className="flex items-center justify-center h-[15vh] px-4 w-full">
              <p className="text-lg mb-4 text-text">
                Are you sure you want to delete this suggestion?
              </p>
            </div>
            <div className="flex items-center justify-around w-full p-4">
              <button
                onClick={handleDeleteAnnouncement}
                className="bg-red-500 text-white border border-red-500 min-w-24 px-4 h-12 rounded-full hover:bg-red-700 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-white text-dashboardPrimary border border-dashboardPrimary min-w-24 px-4 h-12 rounded-full hover:bg-dashboardPrimary hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {selectedAnnouncement && (
        <dialog ref={dialogRef} open={modalOpen} className="modal rounded-2xl">
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
        </dialog>
      )}

      <dialog
        ref={createDialogRef}
        open={isCreateModalOpen}
        className="modal rounded-2xl min-w-96"
      >
        <div className="bg-dashboardSecondary rounded-2xl text-dashboardPrimary w-96">
          <div className="bg-dashboardPrimary h-[10vh] w-full flex items-center px-4 text-white justify-center text-xl rounded-t-2xl">
            <h3 className="my-2">Create New Announcement</h3>
          </div>
          <div className="flex flex-col items-center justify-start px-4 mt-4 w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 mb-4 rounded-md outline-none"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 mb-4 rounded-md outline-none"
              rows="4"
            />
          </div>

          <div className="flex items-center justify-between p-4 gap-4">
            <button
              onClick={handleCreateAnnouncement}
              className="bg-dashboardPrimary hover text-white px-4 py-2 rounded-full"
            >
              Announce
            </button>
            <button
              onClick={closeCreateModal}
              className="bg-white hover-light text-dashboardPrimary px-4 py-2 rounded-full shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <style>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          padding: 0;
          margin: 0;
          opacity: 1;
          z-index:40
        }
        .modal-open {
          overflow: hidden;
        }
        .modal-open::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 10;
        }
      .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 30; /* Ensure this is below the modal content */
        }
        .modal-content {
          z-index: 40;
        }
      `}</style>
    </div>
  );
};

export default Announcement;
