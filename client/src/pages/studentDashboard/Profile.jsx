import { useState, useEffect } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudent,
  fetchStudentById,
  updateProfileUrl,
} from "../../redux/slices/studentSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { Skeleton, CircularProgress } from "@mui/material";

// Utility function to get initials from the first two words of a full name
const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join(" ");
  return initials;
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [name, setName] = useState("");
  const [roomDate, setRoomDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(undefined);
  const [uploading, setUploading] = useState(false); // New state for upload status

  const dispatch = useDispatch();
  const {
    user,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);
  const {
    student,
    status: studentStatus,
    error: studentError,
  } = useSelector((state) => state.students);

  const uploadFile = (file) => {
    setUploading(true); // Set uploading to true when upload starts
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle progress if needed
      },
      (error) => {
        console.log(error);
        setUploading(false); // Set uploading to false on error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileData((prev) => ({ ...prev, profile_url: downloadURL }));
          dispatch(updateProfileUrl({ profile_url: downloadURL }));
          setUploading(false); // Set uploading to false when done
        });
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchStudentById(user._id));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user._id]);

  useEffect(() => {
    if (student) {
      setName(student.name);
      const date = new Date(student.room_booked_until).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      setRoomDate(date);
    }
  }, [student]);

  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  const handleEditClick = () => {
    if (isEditing) {
      dispatch(updateStudent({ id: user._id, updatedData: profileData }));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setName(value);
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h2 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Student Profile
      </h2>
      <div className="bg-dashboardSecondary shadow-lg main mr-0 sm:mr-6 rounded-lg p-4">
        <div className="flex-col items-center mb-4 space-y-3 pl-5">
          {isLoading ? (
            <Skeleton
              variant="circle"
              width={192}
              height={192}
              className="w-24 h-24 md:w-48 md:h-48 rounded-full"
            />
          ) : (
            <div className="relative rounded-full border-4 bg-dashboardPrimary border-white/50 object-cover p-0 w-24 h-24 md:w-48 md:h-48 flex items-center justify-center">
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
                  <CircularProgress />
                </div>
              )}
              {isEditing && (
                <div className="mt-2 border-2 border-dashboardPrimary bg-dashboardSecondary h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center absolute bottom-0 right-0 sm:bottom-0 sm:right-0 md:bottom-3 md:right-0">
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <label className="cursor-pointer" htmlFor="profilePicture">
                    <FaCamera className="text-dashboardPrimary sm:text-sm md:text-lg" />
                  </label>
                </div>
              )}
              {student?.profile_url === "" ? (
                <h1 className="text-[35px] md:text-[70px] font-bold text-white">
                  {getInitials(student?.name)}
                </h1>
              ) : (
                <img
                  src={student?.profile_url}
                  className="rounded-full object-cover w-full h-full"
                  alt="Profile"
                />
              )}
            </div>
          )}

          <div className="h-24 flex flex-wrap item-center justify-between">
            <div className="text-dashboardText flex flex-col justify-center">
              <div>
                <h3 className="text-lg font-medium">
                  {isLoading ? <Skeleton width={200} /> : student?.name}
                </h3>
              </div>
              <div>
                <p className="text-lg text-dashboardText">
                  {isLoading ? <Skeleton width={200} /> : student?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <button
                  onClick={handleEditClick}
                  className="px-5 py-2 flex gap-2 rounded-full text-white bg-dashboardPrimary items-center"
                >
                  <FaUser />
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-4 pl-5 pb-5">
          <div className="flex-col gap-4">
            <div>
              <label className="block text-sm capitalize text-dashboardPrimary">
                Name
              </label>
              <div className="relative md:w-1/2">
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="name"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary ${
                      isEditing
                        ? "border-black text-black cursor-text"
                        : "border-dashboardText text-dashboardText"
                    } bg-transparent sm:text-sm`}
                    value={name || "N/A"}
                    onChange={handleChange}
                    readOnly={!isEditing}
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
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="email"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={student?.email || "N/A"}
                    onChange={handleChange}
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
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="college"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={student?.college || "N/A"}
                    onChange={handleChange}
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
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="course"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={student?.course || "N/A"}
                    onChange={handleChange}
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
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="hostel"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={student?.hostel || "N/A"}
                    onChange={handleChange}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className="flex-col gap-4">
              <div>
                <label className="block text-sm capitalize text-dashboardPrimary">
                  Room No
                </label>
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="room_no"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={student?.room_no || "N/A"}
                    onChange={handleChange}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className="flex-col gap-4">
              <div>
                <label className="block text-sm capitalize text-dashboardPrimary">
                  Room Booked Until
                </label>
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <input
                    type="text"
                    name="room_booked_until"
                    className={`my-2 block w-full outline-none h-[40px] cursor-default border-b-[1px] font-medium text-dashboardPrimary border-dashboardText text-dashboardText bg-transparent sm:text-sm`}
                    value={roomDate || "N/A"}
                    onChange={handleChange}
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
