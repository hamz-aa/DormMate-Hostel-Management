import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/slices/studentSlice";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton"; // Import Pagination component
import DataNotFound from "../../resources/DataNotFound";
import ErrorPage from "../../resources/ErrorPage";

const Students = () => {
  const dispatch = useDispatch();
  const {
    items: students,
    status,
    error,
  } = useSelector((state) => state.students);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // State for fee status filter
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const [page, setPage] = useState(1); // State for pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "" || student.fee_status === filterStatus)
  );

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setMenuOpen(false); // Close the dropdown after selecting a filter
    setPage(1); // Reset to first page on filter change
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filterOptions = [
    { status: "", label: "All" },
    { status: "Paid", label: "Paid" },
    { status: "Unpaid", label: "Unpaid" },
    { status: "Pending", label: "Pending" },
  ];

  const getColorClass = (status, isDot = false) => {
    if (status === "") return isDot ? "bg-secondary" : "";
    if (status === "Paid") return isDot ? "bg-green-600" : "text-green-600";
    if (status === "Unpaid") return isDot ? "bg-red-600" : "text-red-600";
    return isDot ? "bg-yellow-600" : "text-yellow-600";
  };

  return (
    <div className="px-2 sm:pl-10 pt-5">
      <h3 className="text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Student Information
      </h3>
      <div className="bg-dashboardSecondary main md:min-h-[70vh] min-h-[50vh] mt-5 mr-6 rounded-lg flex flex-col p-4 gap-6">
        <div className="flex justify-between items-center pr-4">
          {/* Search */}
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
              <div className="absolute top-full right-0 mt-1 w-24 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col gap-1 p-2">
                  {filterOptions.map((option) => {
                    const count = students.filter(
                      (student) =>
                        student.fee_status === option.status ||
                        (option.status === "" && student)
                    ).length;

                    return (
                      <div
                        key={option.status}
                        className={`flex items-center gap-2 cursor-pointer ${
                          filterStatus === option.status
                            ? getColorClass(option.status)
                            : count === 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-900"
                        }`}
                        onClick={
                          count > 0
                            ? () => handleFilterChange(option.status)
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
                        <span>{option.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Students List */}
        <div className="flex-grow overflow-y-auto">
          {filteredStudents.length === 0 ? (
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
                    {[...Array(itemsPerPage)].map((_, index) => (
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
            ) : filteredStudents?.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                <DataNotFound />
              </div>
            ) : (
              <ErrorPage />
            )
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mt-10">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Room No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Hostel
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Fee Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentStudents?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/studentprofiles/${student.id}`)
                      }
                    >
                      <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap text-gray-500">
                        {student.room_no}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap text-gray-500">
                        {student.hostel}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap text-gray-500">
                        <span
                          className={`inline-flex h-8 w-16 text-center justify-center items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                            student.fee_status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : student.fee_status === "Unpaid"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.fee_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 9 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="dashboardPrimary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
