import { useState, useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import {
  fetchVouchersByStudent,
  updateVoucher,
} from "../../redux/slices/feeSlice";
import { FaPencil } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Fees = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [consumerId, setConsumerId] = useState("");

  const dispatch = useDispatch();
  const { studentId } = useParams();

  const { vouchers, status: voucherStatus } = useSelector(
    (state) => state.fees
  );

  useEffect(() => {
    if (studentId) {
      dispatch(fetchVouchersByStudent(studentId));
      console.log("Vouchers", vouchers);
    }
  }, [dispatch, studentId]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedVoucher(null);
  };

  const handleUpdate = (id) => {
    console.log(id);

    const updatedData = { month, amount, dueDate, consumerId, status };
    if (month || amount || dueDate || consumerId || status) {
      dispatch(updateVoucher({ id, updatedData }));
    }
    setDialogOpen(false);
    setSelectedVoucher(null);
  };

  const handleEditVoucher = (voucher) => {
    setMonth(voucher?.month);
    setStatus(voucher?.status);
    setAmount(voucher?.amount);
    setConsumerId(voucher?.consumer_id);
    setDueDate(voucher?.due_date);
    setSelectedVoucher(voucher);
    setDialogOpen(true);
    // console.log(dueDate);
  };

  const isLoading = voucherStatus === "loading";

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Fees Dashboard
      </h2>
      <div className="bg-dashboardSecondary shadow-lg main md:min-h-[70vh] min-h-[50vh] mt-5 mr-0 sm:mr-6 rounded-lg flex flex-col p-4 gap-6">
        <div className="header flex items-center justify-start h-[7vh] w-full pt-2">
          <h2 className="text-xl text-dashboardPrimary font-semibold">
            Fee History
          </h2>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
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
                      "Actions",
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Skeleton width={100} height={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : vouchers?.length === 0 ? (
            <p className="text-center mt-8 text-gray-500">
              No payments found. Please adjust your filters or search criteria.
            </p>
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {vouchers?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleEditVoucher(payment)}
                            className="text-white bg-dashboardPrimary p-2 rounded-full"
                          >
                            <FaPencil className="w-5 h-5" />
                          </button>
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

      {/* Edit Voucher Modal */}
      {dialogOpen && selectedVoucher && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="modal fixed inset-0 opacity-50"
              onClick={handleDialogClose}
            ></div>
            <div className="modal-content bg-white rounded-2xl shadow-lg z-10 w-[30rem]">
              <div className="bg-dashboardPrimary h-[15vh] flex items-center justify-center rounded-t-2xl">
                <h3 className="text-2xl font-semibold text-white">
                  Edit Voucher
                </h3>
              </div>
              <div className="w-full flex flex-col items-center justify-center p-6">
                <TextField
                  label="Amount"
                  name="amount"
                  value={amount}
                  variant="standard"
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ width: "100%", marginBottom: 2 }}
                  // InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Due Date"
                  name="due_date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  variant="standard"
                  sx={{ width: "100%", marginBottom: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Consumer ID"
                  name="consumer_id"
                  value={consumerId}
                  variant="standard"
                  onChange={(e) => setConsumerId(e.target.value)}
                  sx={{ width: "100%", marginBottom: 2 }}
                  // InputProps={{ readOnly: true }}
                />{" "}
                <TextField
                  id="status"
                  label="Status"
                  variant="standard"
                  select
                  fullWidth
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mb-4"
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </TextField>
                <div className="flex items-center h-max justify-between w-full pt-4">
                  <button
                    onClick={() => handleDialogClose()}
                    className="bg-white text-dashboardPrimary border border-dashboardPrimary w-24 h-12 rounded-full hover:bg-dashboardPrimary hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(selectedVoucher._id)} // Add save functionality here
                    className="bg-dashboardPrimary text-white w-max px-8 h-12 rounded-full hover:bg-white hover:text-dashboardPrimary border border-dashboardPrimary transition-all"
                  >
                    Save Changes
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
              width: 100vw;
              height: 100vh;
              transform: translate(-50%, -50%);
              border: none;
              padding: 0;
              margin: 0;
              opacity: 1;
              z-index: 40;
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

export default Fees;
