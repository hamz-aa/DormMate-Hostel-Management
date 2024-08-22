import { useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuggestions,
  deleteSuggestion,
} from "../../redux/slices/suggestionSlice";
import { Pagination, Skeleton } from "@mui/material";
import DataNotFound from "../../resources/DataNotFound";

const SuggestionBox = () => {
  const dispatch = useDispatch();
  const {
    items: suggestions,
    status,
    error,
  } = useSelector((state) => state.suggestions);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionToDelete, setSuggestionToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Number of suggestions per page
  const dialogRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSuggestions());
  }, [dispatch]);

  useEffect(() => {
    if (modalOpen || confirmDeleteModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalOpen, confirmDeleteModalOpen]);

  const openModal = (index) => {
    setSelectedSuggestion(filteredSuggestions[index]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSuggestion(null);
  };

  const openConfirmDeleteModal = (index) => {
    setSuggestionToDelete(filteredSuggestions[index]._id);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setSuggestionToDelete(null);
  };

  const handleDeleteSuggestion = () => {
    dispatch(deleteSuggestion(suggestionToDelete)).then(() => {
      closeConfirmDeleteModal();
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter((suggestion) => {
    const query = searchQuery.toLowerCase();
    return (
      suggestion.title.toLowerCase().includes(query) ||
      suggestion.description.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuggestions = filteredSuggestions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h3 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Suggestion Box
      </h3>
      <div className="bg-dashboardSecondary main min-h-[70vh] mr-0 sm:mr-6 rounded-lg p-4">
        <div className="relative w-full flex items-center justify-start my-6">
          <form className="w-72">
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
                aria-label="Search Suggestions"
                className="block w-full py-3 px-4 pr-10 pl-10 text-sm text-gray-900 shadow-lg rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Search Suggestions"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                value={searchQuery}
                required
              />
            </div>
          </form>
        </div>
        <div
          className="grid gap-[20px]"
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
          ) : currentSuggestions.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              <DataNotFound />
            </div>
          ) : (
            currentSuggestions?.map((suggestion, index) => (
              <div
                key={suggestion._id}
                className="flex flex-col justify-between w-full h-max min-w-[280px] bg-dashboardPrimary text-white p-4 rounded-2xl"
              >
                <div className="flex items-center gap-0 justify-between h-full">
                  <h3 className="text-base font-semibold text-ellipsis overflow-hidden w-[60%] whitespace-nowrap">
                    {suggestion.title}
                  </h3>
                  <p
                    className="text-announcementCard text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {formatDate(suggestion.date)}
                  </p>
                </div>
                <hr className="my-2" />
                <div className="h-full w-full">
                  <p className="announcement-description text-sm text-announcementCard mb-4 h-full">
                    {suggestion.description}
                  </p>
                </div>
                <div
                  className="h-full flex justify-between items-center"
                  style={{ fontSize: "0.75rem" }}
                >
                  <button
                    onClick={() => openModal(index)}
                    className="w-fit bg-white hover-light text-primary rounded-full px-2 py-1.5"
                  >
                    Read More
                  </button>
                  <span
                    onClick={() => openConfirmDeleteModal(index)}
                    className="bg-white hover-light text-dashboardPrimary w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <FaTrashAlt className="text-lg" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {filteredSuggestions.length > itemsPerPage && (
          <div className="flex justify-center mt-10">
            <Pagination
              count={Math.ceil(filteredSuggestions.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="dashboardPrimary"
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <>
          <div className="modal-overlay"></div>
          <dialog
            ref={dialogRef}
            open={modalOpen}
            className="modal rounded-2xl"
          >
            <div
              className="modal-content bg-white rounded-2xl shadow-lg z-10 w-screen sm:w-[30rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-dashboardPrimary min-h-[10vh] w-full flex items-end p-4 text-white justify-between rounded-t-2xl">
                <h3 className="text-2xl text-white font-semibold w-[75%]">
                  {selectedSuggestion.title}
                </h3>
                <p
                  className="text-contactGray text-lg"
                  style={{ fontSize: "0.75rem" }}
                >
                  {formatDate(selectedSuggestion.date)}
                </p>
              </div>
              <div className="w-full flex flex-col items-start justify-center p-6">
                <p className="text-text text-lg">
                  {selectedSuggestion.description}
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
        </>
      )}

      {confirmDeleteModalOpen && (
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
                onClick={handleDeleteSuggestion}
                className="bg-red-500 text-white border border-red-500 min-w-24 px-4 h-12 rounded-full hover:bg-red-700 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeConfirmDeleteModal}
                className="bg-white text-dashboardPrimary border border-dashboardPrimary min-w-24 px-4 h-12 rounded-full hover:bg-dashboardPrimary hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(5px);

          background-color: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }
        .modal-open {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SuggestionBox;
