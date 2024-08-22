import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Chart from "react-apexcharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBed,
  faDollarSign,
  faDoorOpen,
  faReceipt,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAdminDashboard } from "../../redux/slices/dashboardSlice";

function AdminDashboard() {
  const [filter, setFilter] = useState("Monthly");
  const dispatch = useDispatch();
  const {
    totalStudents,
    availableRooms,
    availableBeds,
    paidVouchers,
    unpaidVouchers,
    feesCollected,
    suggestions,
    paymentHistory,
    hostelProgress,
    status,
    error,
  } = useSelector((state) => state.dashboard.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  const dummyHostelProgress = {
    January: 70,
    February: 80,
    March: 65,
    April: 75,
    May: 85,
    June: 90,
  };

  const dummyPaymentHistory = {
    January: 1000,
    February: 1500,
    March: 2000,
    April: 2500,
    May: 3000,
    June: 3500,
  };

  const monthlyData = {
    options: {
      chart: {
        id: "occupancy-rate",
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 10,
      },
      stroke: {
        curve: "smooth",
        colors: ["#4A90E2"],
      },
      fill: {
        opacity: 0.3,
      },
      legend: {
        show: false,
      },
      colors: ["#4A90E2"],
    },
    series: [
      {
        name: "Hostel Progress",
        data: Object.values(dummyHostelProgress),
      },
    ],
  };

  const doughnutData = {
    options: {
      labels: ["Paid", "Unpaid"],
      colors: ["#4A90E2", "#D0D0D0"],
    },
    series: [paidVouchers || 40, unpaidVouchers || 60],
  };

  const paymentHistoryData = {
    options: {
      chart: {
        id: "payment-history",
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      colors: ["#50E3C2"],
    },
    series: [
      {
        name: "Payments",
        data: Object.values(dummyPaymentHistory),
        color: "#50E3C2",
      },
    ],
  };

  const graphData = monthlyData;

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h1 className="text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Admin Dashboard
      </h1>
      <div className="bg-dashboardSecondary md:min-h-[70vh] min-h-[50vh] mb-4 pb-10 mt-5 md:mr-6 rounded-lg flex flex-col p-4 gap-6">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#6ba7d4] to-[#0A2640] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    Total Students
                  </h2>
                  <p className="text-3xl sm:text-4xl">{totalStudents || 0}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ fontSize: "4rem" }}
                    className="text-[#4a79a9]"
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#00c2cb] to-[#00B4D8] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    Available Rooms
                  </h2>
                  <p className="text-3xl sm:text-4xl">{availableRooms || 0}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    style={{ fontSize: "4rem" }}
                    className="text-[#2b8394]"
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#75d375] to-[#1B5E20] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    Available Beds
                  </h2>
                  <p className="text-3xl sm:text-4xl">{availableBeds || 0}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faBed}
                    style={{ fontSize: "4rem" }}
                    className="text-[#30a834]"
                  />
                </div>
              </>
            )}{" "}
          </div>
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#ff9478] to-[#ff7043] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    Fees Collected
                  </h2>
                  <p className="text-2xl sm:text-3xl font-bold">
                    Rs: {formatNumber(feesCollected || 0)}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    style={{ fontSize: "4rem" }}
                    className="text-[#f4673c]"
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#9575cd] to-[#5e35b1] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    New Suggestions
                  </h2>
                  <p className="text-3xl sm:text-4xl">{suggestions || 0}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    style={{ fontSize: "4rem" }}
                    className="text-[#8454ad]"
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-52 flex flex-col items-start justify-between bg-gradient-to-b from-[#dbbb1c] to-[#c18a0b] border border-gray-200 text-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300">
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
                    Paid Vouchers
                  </h2>
                  <p className="text-3xl sm:text-4xl">{paidVouchers}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faReceipt}
                    style={{ fontSize: "4rem" }}
                    className="text-[#ffbf00]"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/* Graph Section */}
        <div className="flex justify-end mb-4 w-full hidden ">
          <FormControl variant="outlined" size="small">
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex w-full flex-wrap justify-between md:gap-0 gap-4 mt-10">
          <div className="md:w-[55%] w-full h-[70vh] bg-white shadow-md p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-dashboardPrimary mb-4">
              Hostel Progress
            </h2>
            <div className="relative h-64">
              {status === "loading" ? (
                <div className="w-[100%] h-full flex items-center justify-center">
                  <Skeleton
                    variant="rectangle"
                    height="100%"
                    className="w-full"
                  />
                </div>
              ) : (
                <Chart
                  options={graphData.options}
                  series={graphData.series}
                  type="line"
                  height="100%"
                  width="100%"
                />
              )}
            </div>
          </div>
          <div className="w-full md:w-[43%] h-[70vh] bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-dashboardPrimary mb-4">
              Fees Collection
            </h2>
            <div className="relative h-64">
              {status === "loading" ? (
                <div className="w-[100%] h-full flex items-center justify-center">
                  <Skeleton
                    variant="circular"
                    height="100%"
                    className="w-full md:w-3/4"
                  />
                </div>
              ) : (
                <Chart
                  options={doughnutData.options}
                  series={doughnutData.series}
                  type="donut"
                  height="100%"
                  width="100%"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center mt-0 md:mt-6 md:gap-0 gap-4">
          <div className="md:w-[55%] w-full h-[70vh] bg-white p-6 rounded-lg shadow-md border ">
            <h2 className="text-xl font-semibold text-dashboardPrimary mb-4">
              Payment History
            </h2>
            <div className="relative h-64">
              {status === "loading" ? (
                <div className="w-[100%] h-full flex items-center justify-center">
                  <Skeleton
                    variant="rectangle"
                    height="100%"
                    className="w-full"
                  />
                </div>
              ) : (
                <Chart
                  options={paymentHistoryData.options}
                  series={paymentHistoryData.series}
                  type="bar"
                  height="100%"
                  width="100%"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
