import { useState, useEffect } from "react";
import { Skeleton, Pagination, CircularProgress } from "@mui/material";
import { fetchRooms } from "../../redux/slices/roomSlice.js";
import { requestRoomChange } from "../../redux/slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "../../resources/DataNotFound.jsx";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;
  const [roomDate, setRoomDate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // State for fee status filter
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isRequestLoading, setIsRequestLoading] = useState(false); // Rename from isButtonLoading
  const [loadingRoomId, setLoadingRoomId] = useState(null);
  const dispatch = useDispatch();
  const {
    student,
    status: studentStatus,
    error: studentError,
  } = useSelector((state) => state.students);
  const {
    items,
    status: roomStatus,
    error: roomError,
  } = useSelector((state) => state.rooms);

  useEffect(() => {
    const date = new Date(student?.room_booked_until).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
    setRoomDate(date);
    dispatch(fetchRooms());
  }, [dispatch, student]);

  const handleRoomChangeRequest = async (roomNo) => {
    try {
      setIsRequestLoading(true);
      setLoadingRoomId(roomNo);
      await dispatch(requestRoomChange({ id: student._id, roomNo }));
    } catch (error) {
      console.error("Error during room change request:", error);
    } finally {
      setIsRequestLoading(false);
      setLoadingRoomId(null);
    }
  };

  // Pagination logic
  const handlePagination = (filteredRooms) => {
    if (!filteredRooms) return [];
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const pages = Math.ceil(filteredRooms.length / roomsPerPage);
    setTotalPages(pages);
    return currentRooms;
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status) => {
    setSearchTerm("");
    setFilterStatus(status);
    setMenuOpen(false); // Close the dropdown after selecting a filter
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const filterOptions = [
    { status: "All", label: "All" },
    { status: "Available", label: "Available" },
    { status: "Maintenance", label: "Maintenance" },
    { status: "Occupied", label: "Occupied" },
  ];

  const getColorClass = (status, isDot = false) => {
    if (status === "All") return isDot ? "bg-secondary" : "";
    if (status === "Available")
      return isDot ? "bg-green-600" : "text-green-600";
    if (status === "Maintenance") return isDot ? "bg-red-600" : "text-red-600";
    return isDot ? "bg-yellow-600" : "text-yellow-600";
  };

  const filterRooms = () => {
    let result = items || []; // Ensure items is defined
    if (searchTerm) {
      result = result.filter(
        (room) =>
          String(room.room_no)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          room.room_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(room.price).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus && filterStatus !== "All") {
      result = result.filter((room) => room.status === filterStatus);
    }
    return result;
  };

  useEffect(() => {
    if (items.length > 0) {
      const filteredRooms = filterRooms();
      const paginatedRooms = handlePagination(filteredRooms);
      setRooms(paginatedRooms);
    }
  }, [items, searchTerm, filterStatus, currentPage]);

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h1 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Room Dashboard
      </h1>
      {student?.room_id !== "N/A" && (
        <div className="bg-dashboardSecondary shadow-lg main mr-0 sm:mr-6 rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-dashboardPrimary mb-4 md:ml-[-30px] text-center">
            Room with Current Booking
          </h2>
          <div className="flex-grow overflow-y-auto sm:mt-0 mt-4">
            {isLoading ? (
              <div className="animate-pulse">
                <table className="min-w-full divide-y divide-gray-200 mt-5 select-none">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Month",
                        "Amount",
                        "Due Date",
                        "Consumer ID",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                        >
                          <Skeleton width={100} height={20} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(1)].map((_, index) => (
                      <tr key={index} className="rounded-lg mb-2">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={80} height={20} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={60} height={20} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={100} height={20} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={120} height={20} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={80} height={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 mb-4 select-none">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Booked Until
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
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student?.room_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student?.room_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {roomDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs: {student?.room_price || "NaN"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="w-36 px-4 py-2 rounded-full bg-dashboardPrimary text-white  cursor-default">
                        Booked
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}{" "}
          </div>
        </div>
      )}

      <div className="bg-dashboardSecondary shadow-lg main mr-0 sm:mr-6 rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-dashboardPrimary mb-4 md:ml-[-30px] text-center">
          All Rooms
        </h2>
        {/* searching  */}

        <div className="flex justify-between items-center pr-4 h-20">
          {/* Search */}
          <div className="relative w-72">
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
                  onChange={handleSearchChange}
                  value={searchTerm}
                  required
                />
              </div>
            </form>
          </div>
          {/* Filter */}
          <div className="relative ml-4">
            <div className="h-max p-3 rounded-full bg-white flex items-center justify-center shadow-md">
              <button
                className="focus:outline-none text-dashboardPrimary"
                onClick={handleMenuToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    menuOpen ? "text-dashboardPrimary" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-1 w-max bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col gap-1 p-2">
                  {filterOptions.map((option) => {
                    // const count = items.filter(
                    //   (student) =>
                    //     student.fee_status === option.status ||
                    //     (option.status === "" && student)
                    // ).length;

                    return (
                      <div
                        key={option.status}
                        className={`flex items-center gap-2 cursor-pointer ${
                          filterStatus === option.status
                            ? getColorClass(option.status)
                            : "text-gray-600"
                        }`}
                        onClick={() => handleFilterChange(option.status)}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${getColorClass(
                            option.status,
                            true
                          )}`}
                        ></div>
                        <span>{option.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto sm:mt-0 mt-4">
          {isLoading ? (
            <div className="animate-pulse">
              <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Month",
                      "Amount",
                      "Due Date",
                      "Consumer ID",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                      >
                        <Skeleton width={100} height={20} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, index) => (
                    <tr key={index} className="rounded-lg mb-2">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={80} height={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={60} height={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={100} height={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={120} height={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={80} height={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : rooms?.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              <DataNotFound />
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200 select-none">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms?.length > 0 ? (
                    rooms?.map((room, index) => (
                      <tr key={room?._id || index} className="text-gray-600">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {room?.room_no}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {room?.room_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Rs: {room?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex h-8 w-max text-center justify-center items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                              room.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : room.status === "Maintenance"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {room?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {student?.room_id !== "N/A" && (
                            <button
                              className={`w-36 px-4 py-2 rounded-full ${
                                room?.status === "Available"
                                  ? "bg-dashboardPrimary text-white cursor-pointer hover"
                                  : "bg-footerGray text-contactGray cursor-not-allowed"
                              }`}
                              onClick={() =>
                                handleRoomChangeRequest(room?.room_no)
                              }
                              disabled={
                                room?.status !== "Available" || isRequestLoading
                              }
                            >
                              {loadingRoomId === room.room_no ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : room._id === student?.room_change_request ? (
                                "Requested"
                              ) : student?.room_id !== "N/A" ? (
                                "Request Change"
                              ) : (
                                "Book Now"
                              )}
                            </button>
                          )}
                          {student?.room_id == "N/A" && (
                            <button
                              className={`w-36 px-4 py-2 rounded-full ${
                                room?.status === "Available"
                                  ? "bg-dashboardPrimary text-white cursor-pointer hover "
                                  : "bg-footerGray text-contactGray cursor-not-allowed"
                              }`}
                              onClick={() =>
                                handleRoomChangeRequest(room?.room_no)
                              }
                              disabled={room?.status !== "Available"}
                            >
                              {room._id === student?.room_change_request
                                ? "Requested"
                                : "Book Now"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                      >
                        No rooms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex justify-center mt-10 h-max">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="dashboardPrimary"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
