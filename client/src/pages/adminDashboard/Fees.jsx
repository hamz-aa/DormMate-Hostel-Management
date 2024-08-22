import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchFees, createFeeVoucher } from "../../redux/slices/feeSlice";
import Skeleton from "@mui/material/Skeleton"; // Import Pagination component
import DataNotFound from "../../resources/DataNotFound";
import ErrorPage from "../../resources/ErrorPage";

const ITEMS_PER_PAGE = 10;

const Fees = () => {
  const dispatch = useDispatch();
  const { items: fees, status, error } = useSelector((state) => state.fees);

  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [due_date, setDueDate] = useState("");
  const [consumer_id, setConsumerId] = useState("");
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFees());
  }, [dispatch]);

  useEffect(() => {
    // Calculate total pages whenever filteredPayments or ITEMS_PER_PAGE changes
    const filteredPayments = fees.filter((payment) => {
      return (
        payment.amount
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.year
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.consumer_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    const totalItems = filteredPayments.length;
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
  }, [fees, searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling on body
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAmount("");
    setDueDate("");
    setConsumerId("");
    setErrors({});
    document.body.style.overflow = "auto"; // Enable scrolling on body
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setAmount(value);
    } else if (name === "due_date") {
      setDueDate(value);
    } else if (name === "consumer_id") {
      setConsumerId(value);
    }
  };

  const handleAddVoucher = () => {
    if (!amount || !due_date || !consumer_id) {
      setErrors({
        amount: !amount ? "Amount is required" : "",
        due_date: !due_date ? "Due date is required" : "",
        consumer_id: !consumer_id ? "Consumer ID is required" : "",
      });
      return;
    }

    const currentDate = new Date(due_date);
    const currentDateStr = currentDate.toISOString().split("T")[0];

    if (due_date < currentDateStr) {
      setErrors({
        ...errors,
        due_date: "Due date cannot be less than current date",
      });
      return;
    }

    const newMonth = currentDate.toLocaleString("default", { month: "long" });
    const newYear = currentDate.getFullYear();

    const voucherExists = fees.some(
      (fee) => fee.month === newMonth && fee.year === newYear
    );

    if (voucherExists) {
      alert("A voucher for this month ID already exists.");
      return;
    }

    const newPayment = {
      month: newMonth,
      year: newYear,
      amount: parseFloat(amount),
      due_date: due_date,
      consumer_id: consumer_id,
    };

    dispatch(createFeeVoucher(newPayment));
    handleCloseModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredPayments = fees.filter((payment) => {
    return (
      payment.amount
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.year
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.consumer_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Fees Dashboard
      </h2>
      <div className="bg-dashboardSecondary main mr-0 sm:mr-6 rounded-lg p-4">
        <div className="flex flex-wrap gap-2 justify-between items-center h-16 md:h-20 w-full mt-[-10px]">
          <h2 className="text-lg sm:text-xl text-secondary font-semibold truncate">
            Online Payments
          </h2>
          <button
            className="text-white hover px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-dashboardPrimary"
            onClick={handleOpenModal}
          >
            Create Voucher
          </button>
        </div>

        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex justify-between items-center md:pr-4">
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
        </div>
        <div className="flex-grow overflow-y-auto">
          {currentItems.length === 0 ? (
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
                    {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
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
            ) : currentItems?.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                <DataNotFound />
              </div>
            ) : (
              <ErrorPage />
            )
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mt-10 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Month
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Year
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
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Consumer ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((payment) => (
                  <tr
                    onClick={() =>
                      navigate(`/admin/fees/${payment.month}/${payment.year}`)
                    }
                    key={payment.id}
                    className="hover:bg-gray-100 cursor-pointer text-gray-600"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {payment.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {payment.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {payment.amount.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(payment.due_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {payment.consumer_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="dashboardPrimary"
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <>
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="modal-content bg-white rounded-2xl shadow-lg w-full max-w-md">
              <div className="bg-dashboardPrimary h-[15vh] flex items-center justify-center rounded-t-2xl">
                <h2 className="text-xl font-semibold  text-white">
                  Generate Fee Voucher
                </h2>
              </div>
              <div className="w-full flex flex-col items-between justify-center p-6">
                <div className="mb-4 ">
                  <label className="block text-sm font-medium mb-1 text-primary">
                    Consumer ID
                  </label>
                  <input
                    type="text"
                    name="consumer_id"
                    value={consumer_id}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 outline-none text-dashboardPrimary"
                  />
                  {errors.consumer_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.consumer_id}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-primary">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 outline-none text-dashboardPrimary "
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-primary">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    value={due_date}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 outline-none text-dashboardPrimary"
                  />
                  {errors.due_date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.due_date}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between px-6 pb-4">
                <button
                  onClick={handleAddVoucher}
                  className="bg-dashboardPrimary hover text-white px-4 py-2 rounded-full"
                >
                  Add Voucher
                </button>
                <button
                  onClick={handleCloseModal}
                  className="ml-2 text-dashboardPrimary hover-light rounded-full px-4 py-2"
                >
                  Cancel
                </button>
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
                  z-index:40
                   background: rgba(0, 0, 0, 0.5);
                  backdrop-filter: blur(5px);
                }
                .modal-content {
                  z-index: 20;
                }
              `}</style>
        </>
      )}
    </div>
  );
};

export default Fees;
