import { useState, useEffect } from "react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Pagination } from "@mui/material"; // Import Pagination component

import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../redux/slices/roomSlice";
import DataNotFound from "../../resources/DataNotFound";
import ErrorPage from "../../resources/ErrorPage";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  "&.Mui-selected": {
    backgroundColor: "#f0f0f0",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#e0e0e0",
  },
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

const Rooms = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const { items, status, error } = useSelector((state) => state.rooms);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const roomsPerPage = 10;
  const [currentRooms, setCurrentRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // State for room status filter
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Pagination logic
  const handlePagination = (filteredRooms) => {
    // Calculate the indices for slicing the filteredRooms array
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const paginatedRooms =
      filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom) || [];
    const pages = Math.ceil((filteredRooms.length || 0) / roomsPerPage);
    setTotalPages(pages); // Set total pages based on filteredRooms length
    return paginatedRooms;
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (items.length > 0) {
      const filteredRooms = filterRooms(); // Get filtered rooms based on search and status
      const paginatedRooms = handlePagination(filteredRooms); // Paginate filtered rooms
      setRooms(paginatedRooms); // Set the current rooms to be displayed
    }
  }, [items, searchTerm, filterStatus, currentPage]);

  const filterRooms = () => {
    let result = items; // Use items from the state, not the local rooms state

    if (searchTerm) {
      result = result.filter((room) => {
        const roomNo = String(room?.room_no || "").toLowerCase();
        const roomType = String(room?.room_type || "").toLowerCase();
        const status = String(room?.status || "").toLowerCase();
        const price = String(room?.price || "").toLowerCase();
        const term = searchTerm.toLowerCase();

        return (
          roomNo.includes(term) ||
          roomType.includes(term) ||
          status.includes(term) ||
          price.includes(term)
        );
      });
    }

    if (filterStatus && filterStatus !== "All") {
      result = result.filter((room) => room.status === filterStatus);
    }

    setFilteredRooms(result); // Set filtered rooms for pagination
    return result; // Return filtered rooms for pagination
  };

  const openAddModal = () => {
    setCurrentRoom({
      room_no: "",
      room_type: "",
      status: "",
      price: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRoom(null);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveRoom = () => {
    if (currentRoom._id) {
      dispatch(updateRoom({ id: currentRoom._id, updatedData: currentRoom }));
    } else {
      dispatch(createRoom(currentRoom));
    }
    closeModal();
  };

  const handleDeleteRoom = async (roomId) => {
    dispatch(deleteRoom(roomId));
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "All") {
      setFilteredRooms(items); // Reset filtered rooms to all items
    } else {
      const filtered = items.filter((room) => room.status === status);
      setFilteredRooms(filtered);
    }
    setMenuOpen(false); // Close the dropdown after selecting a filter
  };

  const filterOptions = [
    { status: "All", label: "All" },
    { status: "Available", label: "Available" },
    { status: "Maintenance", label: "Maintenance" }, // Corrected typo here
    { status: "Occupied", label: "Occupied" },
  ];

  const getColorClass = (status, isDot = false) => {
    if (status === "All") return isDot ? "bg-secondary" : "";
    if (status === "Available")
      return isDot ? "bg-green-600" : "text-green-600";
    if (status === "Maintenance") return isDot ? "bg-red-600" : "text-red-600"; // Corrected typo here
    if (status === "Occupied")
      return isDot ? "bg-yellow-600" : "text-yellow-600";
    return isDot ? "bg-yellow-600" : "text-yellow-600";
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Room Dashboard
      </h2>
      <div className="bg-dashboardSecondary main md:min-h-[70vh] min-h-[50vh] mt-5 mr-6 rounded-lg flex flex-col p-4 gap-6">
        <div className="flex justify-between items-center py-4">
          <h3 className="text-lg sm:text-xl font-semibold text-heading">
            Add New Room
          </h3>
          <button
            onClick={openAddModal}
            className="bg-dashboardPrimary text-white px-6 py-2 rounded-full"
          >
            Add
          </button>
        </div>
        <hr />

        <div className="bg-transparent rounded-lg px-2 py-4">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
            <div className="relative">
              <form className="max-w-md mx-auto">
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
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="relative flex gap-4 h-max items-center">
              <button
                onClick={() => {
                  navigate(`/admin/rooms/requests`);
                }}
                className="relative w-max h-max py-2 px-4 bg-dashboardPrimary text-white rounded-full"
              >
                <span>Room Requests</span>
                {/* <IoMailOpen className="w-10 h-10 text-white bg-dashboardPrimary p-2 rounded-full" /> */}
              </button>

              <div className="h-max p-3 rounded-full bg-white flex items-center justify-center shadow-md">
                <button
                  className="focus:outline-none text-dashboardPrimary"
                  onClick={handleMenuToggle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5h18M3 12h18M3 19h18"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute w-max top-full right-0 mt-1 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col gap-1 p-2">
                      {filterOptions.map((option) => {
                        const count = rooms?.filter(
                          (room) =>
                            room.status === option.status ||
                            (option.status === "All" && room)
                        ).length;

                        return (
                          <div
                            key={option.status}
                            className={`flex items-center gap-2 cursor-pointer ${
                              filterStatus === option?.status
                                ? getColorClass(option.status)
                                : count === 0
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-900"
                            }`}
                            onClick={
                              count > 0
                                ? () => handleFilter(option.status)
                                : null
                            }
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                count === 0
                                  ? "bg-gray-300"
                                  : getColorClass(option.status, true)
                              }`}
                            ></div>
                            <span
                              className={`flex items-center ${
                                filterStatus === option.status
                                  ? "font-bold"
                                  : ""
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto">
            {filteredRooms?.length === 0 ? (
              status === "loading" ? (
                <div className="animate-pulse">
                  <table className="min-w-full divide-y divide-gray-200 mt-10">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                          <Skeleton width={150} />
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                          <Skeleton width={100} />
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                          <Skeleton width={80} />
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                          <Skeleton width={100} />
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                          <Skeleton width={80} />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(10)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap">
                            <Skeleton width={150} />
                          </td>
                          <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap">
                            <Skeleton width={100} />
                          </td>
                          <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap">
                            <Skeleton width={80} />
                          </td>
                          <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap">
                            <Skeleton width={100} />
                          </td>
                          <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap">
                            <Skeleton width={80} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : filteredRooms?.length === 0 ? (
                <div className="col-span-full text-center text-gray-600">
                  <DataNotFound />
                </div>
              ) : (
                <ErrorPage />
              )
            ) : (
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Room No.
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Room Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room, index) => (
                    <tr
                      key={room?._id || index}
                      className="room-list cursor-pointer hover:bg-gray-100 relative z-10"
                    >
                      <td
                        onClick={() => navigate(`/admin/rooms/${room?._id}`)}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        Room {room?.room_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {room?.room_type} Room
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex h-8 w-max text-center justify-center items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                            room?.status === "Available"
                              ? "bg-green-200 text-green-800"
                              : room?.status === "Maintenance"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {room?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs: {room?.price}
                      </td>
                      <td>
                        <div className="h-[60px] w-[90%] flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openEditModal(room)}
                            className="text-white bg-dashboardPrimary p-2 rounded-full hover:scale-105"
                          >
                            <FaPencil className="w-5 h-5 relative z-30" />
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room._id)}
                            className="text-white bg-red-600 p-2 rounded-full"
                          >
                            <FaTrashCan className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {filteredRooms.length > 9 && (
            <div className="flex justify-center mt-10 h-max">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="dashboardPrimary"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal for adding/editing room */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="modal fixed inset-0 opacity-50"
              onClick={closeModal}
            ></div>
            <div className="modal-content bg-white rounded-2xl shadow-lg z-10 w-[30rem]">
              <div className="bg-dashboardPrimary h-[15vh] flex items-center justify-center rounded-t-2xl">
                <h3 className="text-2xl font-semibold text-white">
                  {currentRoom._id ? "Edit Room" : "Add Room"}
                </h3>
              </div>
              <div className="w-full flex flex-col items-center justify-center p-6">
                <TextField
                  label="Room No"
                  name="room_no"
                  value={currentRoom.room_no}
                  onChange={handleRoomChange}
                  variant="standard"
                  sx={{ width: "100%", marginBottom: 2 }}
                />
                <TextField
                  select
                  label="Room Type"
                  name="room_type"
                  value={currentRoom.room_type}
                  onChange={handleRoomChange}
                  variant="standard"
                  sx={{ width: "100%", marginBottom: 2 }}
                >
                  <CustomMenuItem value="Single">Single</CustomMenuItem>
                  <CustomMenuItem value="Double">Double</CustomMenuItem>
                </TextField>
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={currentRoom.status}
                  onChange={handleRoomChange}
                  variant="standard"
                  sx={{ width: "100%", marginBottom: 2 }}
                >
                  <CustomMenuItem value="Available">Available</CustomMenuItem>
                  <CustomMenuItem value="Occupied">Occupied</CustomMenuItem>
                  <CustomMenuItem value="Maintenance">
                    Maintenance
                  </CustomMenuItem>
                </TextField>
                <TextField
                  label="Price"
                  name="price"
                  value={currentRoom.price}
                  onChange={handleRoomChange}
                  variant="standard"
                  sx={{ width: "100%", marginBottom: 2 }}
                />
                <div className="flex items-center h-max justify-between w-full pt-4">
                  <button
                    onClick={saveRoom}
                    className="bg-dashboardPrimary text-white w-max px-8 h-12 rounded-full hover:bg-white hover:text-dashboardPrimary border border-dashboardPrimary transition-all"
                  >
                    {currentRoom._id ? "Save Changes" : "Add"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-white text-dashboardPrimary border border-dashboardPrimary w-24 h-12 rounded-full hover:bg-dashboardPrimary hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <style>{`
                .modal {
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  width:100vw;
                  height:100vh;
                  transform: translate(-50%, -50%);
                  border: none;
                  padding: 0;
                  margin: 0;
                  opacity: 1;
                  z-index:40;
                   background: rgba(0, 0, 0, 0.5);
                  backdrop-filter: blur(5px);
                }
                .modal-content {
                  z-index: 50;
                }
              `}</style>
        </>
      )}
    </div>
  );
};

export default Rooms;
