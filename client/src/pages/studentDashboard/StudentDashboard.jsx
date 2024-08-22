import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDashboard } from "../../redux/slices/dashboardSlice";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faDollarSign,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "@mui/material/Skeleton";

function StudentDashboard() {
  const dispatch = useDispatch();
  const {
    totalAnnouncements,
    roomRequest,
    feeStatus,
    paidVouchers,
    unpaidVouchers,
    status,
    error,
  } = useSelector((state) => state.dashboard.studentDashboard);

  const { student } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudentDashboard(student?._id));
  }, [dispatch, student?._id]);

  const defaultDoughnutData = [50, 50]; // Default data to display when there's no data
  const doughnutData = {
    options: {
      labels: ["Paid", "Unpaid"],
      colors: ["#3CB371", "#E0B348"],
      legend: {
        show: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series:
      paidVouchers !== undefined && unpaidVouchers !== undefined
        ? [paidVouchers, unpaidVouchers]
        : defaultDoughnutData,
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h1 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Student Dashboard
      </h1>
      <div className="bg-dashboardSecondary shadow-lg main md:min-h-[70vh] min-h-[50vh] mt-5 mr-0 sm:mr-6 rounded-lg flex flex-col p-4 gap-6">
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* New Announcements */}
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#5f7aa1] to-[#0A2640] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
            {status === "loading" ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mt-[-10px]">
                  <Skeleton variant="text" width={120} height={40} />
                  <Skeleton variant="text" width={70} height={60} />
                </div>
                <div className="flex justify-between w-full items-center">
                  <Skeleton variant="circular" width={60} height={60} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap w-full justify-between items-center mb-2 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Announcements
                  </h2>
                  <p className="text-3xl sm:text-4xl">
                    {totalAnnouncements || 0}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faBullhorn}
                    style={{ fontSize: "4rem" }}
                    className="text-[#4a79a9]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Room Requests */}
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#69b1af] to-[#00B4D8] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
            {status === "loading" ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mt-[-10px]">
                  <Skeleton variant="text" width={120} height={40} />
                  <Skeleton variant="text" width={70} height={60} />
                </div>
                <div className="flex justify-between w-full items-center">
                  <Skeleton variant="circular" width={60} height={60} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap w-full justify-between items-center mb-2 sm:mb-4">
                  <h2 className="text-xl font-semibold">Room Requests</h2>
                  <span
                    className={`inline-flex h-8 w-20 sm:h-10 sm:w-24 text-center justify-center items-center px-2 py-0.5 rounded-md text-base font-medium ${
                      roomRequest === "Approved"
                        ? "bg-green-200 text-green-800"
                        : roomRequest === "N/A"
                        ? "bg-yellow-200 text-yellow-800"
                        : roomRequest === "Declined"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800" // Default color if no match
                    }`}
                  >
                    {roomRequest !== "" &&
                    roomRequest !== "N/A" &&
                    roomRequest !== false
                      ? "N/A"
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faBed}
                    style={{ fontSize: "4rem" }}
                    className="text-[#2b8394]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Fees Status */}
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#5ec57b] to-[#1B5E20] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
            {status === "loading" ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mt-[-10px]">
                  <Skeleton variant="text" width={120} height={40} />
                  <Skeleton variant="text" width={70} height={60} />
                </div>
                <div className="flex justify-between w-full items-center">
                  <Skeleton variant="circular" width={60} height={60} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-1 w-full justify-between items-center mb-2 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Fees Status
                  </h2>
                  <p>
                    <span
                      className={`inline-flex h-8 w-20 sm:h-10 sm:w-24 text-center justify-center items-center px-2 py-0.5 rounded-md text-base font-medium ${
                        feeStatus === "Paid"
                          ? "bg-green-200 text-green-800"
                          : feeStatus === "Unpaid"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {feeStatus}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    style={{ fontSize: "4rem" }}
                    className="text-[#30a834]"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Graph Section */}
        <div className="flex md:flex-row flex-col items-center justify-center gap-6 mb-6 w-full h-full">
          <div className="w-full md:w-[70%] flex flex-col item-center justify-between h-[60vh] bg-dashboardSecondary p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl font-semibold text-dashboardPrimary mb-4">
              Fees Status
            </h2>
            <div className="relative h-full">
              {status === "loading" ? (
                <div className="w-[100%] h-full flex items-center justify-center">
                  <Skeleton
                    variant="circular"
                    height="100%"
                    className="w-full md:w-[46%]"
                  />
                </div>
              ) : (
                <Chart
                  options={doughnutData.options}
                  series={doughnutData.series}
                  type="donut"
                  height="100%"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
