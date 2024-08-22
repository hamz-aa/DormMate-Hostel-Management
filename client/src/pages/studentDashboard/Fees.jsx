import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Modal } from "@mui/material";
import {
  generateFeeVoucher,
  fetchVouchersByStudent,
} from "../../redux/slices/feeSlice";
import ErrorPage from "../../resources/ErrorPage";
import DataNotFound from "../../resources/DataNotFound";

const Fees = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [voucherExists, setVoucherExists] = useState(false);
  const [dueDatePassed, setDueDatePassed] = useState(false);
  const [noRoomAssigned, setNoRoomAssigned] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();

  const {
    student,
    status: studentStatus,
    error: studentError,
  } = useSelector((state) => state.students);

  const {
    vouchers,
    status: voucherStatus,
    error: voucherError,
  } = useSelector((state) => state.fees);

  useEffect(() => {
    if (student?._id) {
      dispatch(fetchVouchersByStudent(student._id));
    }
  }, [dispatch, student?._id]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setVoucherExists(false);
    setDueDatePassed(false);
    setNoRoomAssigned(false);
  };

  const checkVoucherExists = (month, year) => {
    return vouchers.some(
      (voucher) =>
        new Date(voucher.due_date).getMonth() + 1 === month &&
        new Date(voucher.due_date).getFullYear() === year
    );
  };

  const generateVoucher = () => {
    if (student?.room_no === "N/A") {
      // Assuming roomAssigned indicates if a room is assigned
      setNoRoomAssigned(true);
      setDialogOpen(true);
      return;
    }

    const dueDate = new Date(student.due_date); // Assuming due_date is part of student object
    const isPastDueDate = currentDate > dueDate;
    const currentMonth = currentDate.getMonth() + 1; // 1-based month
    const currentYear = currentDate.getFullYear();

    if (isPastDueDate) {
      setDueDatePassed(true);
      setDialogOpen(true);
      return;
    }

    if (checkVoucherExists(currentMonth, currentYear)) {
      setVoucherExists(true);
      setDialogOpen(true);
      return;
    }

    dispatch(generateFeeVoucher(student?._id));
  };

  const isLoading = voucherStatus === "loading";

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Fees Dashboard
      </h2>
      <div className="bg-dashboardSecondary shadow-lg main mr-0 sm:mr-6 rounded-lg p-4">
        <div className="header flex items-center justify-start h-[15vh] w-full">
          <h2 className="text-xl text-dashboardPrimary font-semibold">
            Online Payments
          </h2>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-col h-[10vh] md:flex-row justify-between sm:items-center items-end">
          <p className="text-sm text-red-500">
            The voucher fee will expire if not paid by the due date.
          </p>
          <button
            className="text-white px-5 py-2 rounded-full bg-dashboardPrimary"
            onClick={generateVoucher}
          >
            Generate Voucher
          </button>
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
                  {[...Array(6)].map((_, index) => (
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
          ) : vouchers?.length === 0 ? (
            <DataNotFound />
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mt-5">
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {vouchers?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No payments found. Please adjust your filters or search
                      criteria.
                    </td>
                  </tr>
                ) : (
                  vouchers?.map((payment, index) => {
                    const paymentDate = new Date(
                      payment?.due_date
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    return (
                      <tr
                        key={payment?._id || index}
                        className="rounded-lg mb-2 text-gray-600"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.month}/{payment?.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rs: {payment?.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {paymentDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment?.consumer_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`inline-flex h-8 w-16 text-center justify-center items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                              payment?.status === "Paid"
                                ? "bg-green-200 text-green-800"
                                : payment?.status === "Unpaid"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment?.status}
                          </span>
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
      {dialogOpen && (
        <>
          <div
            className="modal-backdrop fixed inset-0 flex items-center justify-center z-50"
            onClick={handleDialogClose}
          >
            <div
              className="modal-content bg-white rounded-2xl shadow-lg z-10 w-[30rem] m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-dashboardPrimary min-h-[10vh] w-full flex items-end p-4 text-white justify-between rounded-t-2xl">
                <h3 className="text-2xl text-white font-semibold w-[75%]">
                  {voucherExists
                    ? "Voucher Already Exists"
                    : dueDatePassed
                    ? "Due Date Passed"
                    : "No Room Assigned"}
                </h3>
              </div>
              <div className="w-full flex flex-col items-start justify-center p-6">
                <p className="text-text text-lg">
                  {voucherExists
                    ? "A voucher for this month already exists."
                    : dueDatePassed
                    ? "The due date for voucher generation has passed."
                    : "No room is assigned to this student. Please assign a room first."}
                </p>
                <div className="flex items-center h-max justify-end w-full pt-4">
                  <button
                    onClick={handleDialogClose}
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
  );
};

export default Fees;
