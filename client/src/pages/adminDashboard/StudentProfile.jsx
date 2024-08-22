import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentById,
  deleteStudent,
} from "../../redux/slices/studentSlice";
import DataNotFound from "../../resources/DataNotFound";
import ErrorPage from "../../resources/ErrorPage";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, status, error } = useSelector((state) => state.students);
  console.log(student);
  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentById(studentId));
    }
  }, [dispatch, studentId]);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      dispatch(deleteStudent(studentId));
      navigate("/admin/studentprofiles");
    }
  };

  if (!student) {
    return <DataNotFound />;
  }

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    const initials = parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(" ");
    return initials;
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Student Profile
      </h2>
      <div className="bg-dashboardSecondary shadow-lg main mr-0 sm:mr-6 rounded-lg p-4">
        <div className="flex-col items-center mb-4 space-y-3 md:pl-5">
          {status === "loading" ? (
            <Skeleton
              variant="circle"
              width={192}
              height={192}
              className="w-24 h-24 md:w-48 md:h-48 rounded-full"
            />
          ) : student?.profile_url ? (
            <div className="relative rounded-full border-4 bg-dashboardPrimary border-dashboardPrimary object-cover p-0 w-24 h-24 md:w-48 md:h-48 mb-10 flex items-center justify-center">
              <img
                src={student?.profile_url}
                alt="student Profile "
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="relative rounded-full border-4 bg-dashboardPrimary border-dashboardPrimary object-cover p-0 w-24 h-24 md:w-48 md:h-48 mb-10 flex items-center justify-center">
              <div>
                <h1 className="text-[35px] md:text-[70px] font-bold text-white">
                  {getInitials(student?.name)}
                </h1>
              </div>
            </div>
          )}
          <form className="space-y-4 md:pl-5 pb-5 ">
            <div className="flex-col gap-4">
              <div>
                <label className="block text-sm capitalize text-dashboardPrimary">
                  Name
                </label>
                <div className="relative md:w-1/2">
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="name"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.name}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-col gap-4">
              <div>
                <label className="block text-sm capitalize text-dashboardPrimary">
                  Email
                </label>
                <div className="relative md:w-1/2">
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="email"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.email}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    College
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="college"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.college}
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    Course
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="course"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.course}
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    Hostel
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="hostel"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.hostel}
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    Room no.
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="room_no"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.room_no}
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    Room Type
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="room_type"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student.room_type}
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="flex-col gap-4">
                <div>
                  <label className="block text-sm capitalize text-dashboardPrimary">
                    Fee Status
                  </label>
                  {status === "loading" ? (
                    <Skeleton width="100%" height={40} />
                  ) : (
                    <input
                      type="text"
                      name="fee_status"
                      className="my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm"
                      value={student?.fee_status}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center h-max pt-5 pr-5">
              <button
                onClick={() => {
                  navigate(`/admin/studentprofiles/feesHistory/${studentId}`);
                }}
                className="history-button"
              >
                <span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">Fees History</span>
              </button>
              <button onClick={handleDelete} className="button">
                <svg viewBox="0 0 448 512" className="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
