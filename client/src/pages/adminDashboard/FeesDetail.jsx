import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchersByMonth } from "../../redux/slices/feeSlice";
import DataNotFound from "../../resources/DataNotFound";
import { Skeleton } from "@mui/material";

const Fees = () => {
  const dispatch = useDispatch();
  const { month, year } = useParams();
  const { vouchers, status, error } = useSelector((state) => state.fees);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [errors, setErrors] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchVouchersByMonth({ month, year }));
  }, [dispatch, month, year]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setMenuOpen(false);
  };

  const filteredPayments = vouchers.filter((fee) => {
    const matchesSearchTerm =
      fee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilterStatus = filterStatus
      ? fee.status === filterStatus
      : true;

    return matchesSearchTerm && matchesFilterStatus;
  });
  console.log("Filter Status:", filterStatus);

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Fees Details
      </h2>
      <div className="bg-dashboardSecondary main mr-0 sm:mr-6 rounded-lg p-4 min-h-[70vh]">
        <div className="w-full flex px-4 justify-between item-center h-max">
          <div className="max-w-md flex flex-col items-center justify-center text-center w-full sm:w-[250px] border primary-color py-8 rounded-xl relative z-[19] bg-dashboardPrimary">
            <h2 className="text-2xl font-black text-white">
              {month}/{year}
            </h2>
          </div>
          <div className="relative flex items-center">
            <form className="max-w-md mx-auto shadow-md">
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
        </div>
        <div className="w-full flex px-4 justify-end item-center">
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
              <div className="absolute z-20 top-full right-0 mt-1 w-24 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col gap-1 p-2">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleFilterChange("")}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>All</span>
                  </div>

                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleFilterChange("Paid")}
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Paid</span>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleFilterChange("Unpaid")}
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Unpaid</span>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleFilterChange("Pending")}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto sm:mt-0 mt-4">
          {status === "loading" ? (
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
          ) : filteredPayments?.length === 0 ? (
            <DataNotFound />
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mt-5">
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
                    Room no
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No payments found. Please adjust your filters or search
                      criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPayments?.map((payment, index) => {
                    return (
                      <tr key={payment.id || index} className="rounded-lg mb-2">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.email}{" "}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.room_no}{" "}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.amount}{" "}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div
                            className={`inline-flex h-8 w-16 text-center justify-center items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                              payment.status === "Paid"
                                ? "bg-green-200 text-green-800"
                                : payment.status === "Unpaid"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            <span className="z-10">{payment.status}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fees;
