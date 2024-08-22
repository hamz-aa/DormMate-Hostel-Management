import { useState, useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoomRequests,
  approveRoomRequest,
} from "../../redux/slices/roomSlice";
import DataNotFound from "../../resources/DataNotFound";

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

const RoomRequest = () => {
  const dispatch = useDispatch();
  const {
    requests: rooms,
    status,
    error,
  } = useSelector((state) => state.rooms);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRoomRequests());
  }, [dispatch]);

  const handleApproval = (student_id, room_id, approved) => {
    dispatch(approveRoomRequest({ student_id, room_id, approved }));
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Room Requests
      </h2>
      <div className="bg-dashboardSecondary main min-h-[70vh] mr-0 sm:mr-6 rounded-lg p-4">
        <div className="bg-transparent rounded-lg px-2 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-heading">
              All Requests
            </h3>
          </div>
          <div className="flex-grow overflow-y-auto">
            {rooms.length === 0 ? (
              <DataNotFound />
            ) : (
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                    >
                      Student Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                    >
                      room No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                    >
                      fee status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                    >
                      price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm md:text-md whitespace-nowrap font-semibold text-dashboardPrimary uppercase tracking-wider"
                    >
                      action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms?.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No payments found. Please adjust your filters or search
                        criteria.
                      </td>
                    </tr>
                  ) : (
                    rooms?.map((room, index) => (
                      <tr key={room?.room_id || index} className="room-list">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.room_no}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.fee_status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.room_price}
                        </td>
                        <td>
                          <div className="h-[60px] w-[90%] flex items-center justify-center space-x-2">
                            <button
                              onClick={() =>
                                handleApproval(
                                  room.student_id,
                                  room.room_id,
                                  false
                                )
                              }
                              className="text-white bg-red-600 p-2 rounded-full"
                            >
                              <FaXmark className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleApproval(
                                  room.student_id,
                                  room.room_id,
                                  true
                                )
                              }
                              className="text-white bg-dashboardPrimary p-2 rounded-full"
                            >
                              <FaCheck className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Room Modal */}
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
                  {currentRoom.id ? "Edit Room" : "Add Room"}
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
                  <CustomMenuItem value="Vacant">Vacant</CustomMenuItem>
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
                    {currentRoom.id ? "Save Changes" : "Add"}
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

export default RoomRequest;
