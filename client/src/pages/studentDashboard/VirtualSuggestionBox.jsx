import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { createSuggestion } from "../../redux/slices/suggestionSlice";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const VirtualSuggestionBox = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSuggestion = {
      title,
      description,
      date: new Date().toISOString().split("T")[0],
    };

    setLoading(true);

    try {
      const response = await dispatch(createSuggestion(newSuggestion)).unwrap();
      if (response) {
        toast.success("Suggestion submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit suggestion. Please try again.");
    }

    setLoading(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 relative">
      <h3 className="text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl ">
        Virtual Suggestion Box
      </h3>
      <form
        className="bg-dashboardSecondary shadow-lg main md:h-[70vh] h-[70vh] mt-5 mr-0 sm:mr-6 rounded-lg flex flex-col"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="md:w-[30%] w-[80%] mt-8 mb-5 md:ml-8 ml-4 h-[40px] p-3 outline-none shadow-md rounded-md"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          className="md:w-[60%] w-[80%] md:ml-8 ml-4 h-[200px] p-3 outline-none shadow-md rounded-md resize-none"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-dashboardPrimary text-white w-fit px-8 py-2 rounded-3xl mt-5 md:ml-8 ml-4 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" />
              <span style={{ marginLeft: "8px" }}>Submitting...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VirtualSuggestionBox;
