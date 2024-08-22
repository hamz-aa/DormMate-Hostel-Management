import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleRoom,
  addStudentToRoom,
  removeStudentFromRoom,
} from "../../redux/slices/roomSlice";

// Styled components for improved UI
const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

const AddStudentButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  marginTop: theme.spacing(2),
}));

const RoomDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { currentRoom, status, error } = useSelector((state) => state.rooms);

  const [student, setStudent] = useState({ name: "", email: "" });
  const [addStudentMode, setAddStudentMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (roomId) {
      dispatch(getSingleRoom(roomId));
      console.log(currentRoom);
    }
  }, [dispatch, roomId]);

  const maxStudents = currentRoom?.room_type === "Single" ? 1 : 2;

  const handleAddStudent = () => {
    if (currentRoom.student.length >= maxStudents) {
      setSnackbarMessage(
        `This room can accommodate up to ${maxStudents} students.`
      );
      setSnackbarOpen(true);
      return;
    }

    dispatch(addStudentToRoom({ roomId, email: student.email }))
      .unwrap()
      .then(() => {
        setSnackbarMessage("Student added successfully!");
        setSnackbarOpen(true);
        setAddStudentMode(false);
        setStudent({ name: "", email: "" });
      })
      .catch((error) => {
        setSnackbarMessage(error.message || "Failed to add student");
        setSnackbarOpen(true);
      });
  };

  const handleDeleteStudent = (studentId) => {
    dispatch(removeStudentFromRoom({ id: roomId, studentId: studentId }))
      .unwrap()
      .then(() => {
        setSnackbarMessage("Student removed successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage(error.message || "Failed to remove student");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="px-2 sm:pl-10 pt-5 overflow-auto h-full">
      <h3 className="mb-5 text-dashboardPrimary pl-4 sm:pl-0 text-2xl md:text-xl">
        Room Detail
      </h3>

      <Box
        className="bg-dashboardSecondary main min-h-[70vh] mr-0 sm:mr-6 rounded-lg p-4"
        sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2 }}
      >
        {/* Room Details Card */}
        <StyledCard>
          <CardHeader title="Room Information" />
          <CardContent>
            <Typography
              className="text-dashboardPrimary"
              variant="body1"
              gutterBottom
            >
              <strong>Room Number:</strong> {currentRoom?.room_no}
            </Typography>
            <Typography
              className="text-dashboardPrimary"
              variant="body1"
              gutterBottom
            >
              <strong>Price:</strong> Rs: {currentRoom?.price}
            </Typography>
            <Typography className="text-dashboardPrimary" variant="body1">
              <strong>Room Type:</strong> {currentRoom?.room_type}
            </Typography>
          </CardContent>
        </StyledCard>

        {/* Student Details Card */}
        {currentRoom?.student?.map((student, index) => (
          <StyledCard key={student?.id || index}>
            <CardHeader
              title="Student Details"
              action={
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography
                className="text-dashboardPrimary"
                variant="body1"
                gutterBottom
              >
                <strong>Name:</strong> {student.name}
              </Typography>
              <Typography className="text-dashboardPrimary" variant="body1">
                <strong>Email:</strong> {student.email}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}

        {/* Add Student Section */}
        <StyledCard>
          <CardHeader title="Add Student to Room" />
          <CardContent>
            {addStudentMode && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
              >
                <TextField
                  fullWidth
                  label="Student Name"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Student Email"
                  type="email"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                  variant="outlined"
                />
              </Box>
            )}
            <AddStudentButton
              variant="contained"
              color={addStudentMode ? "success" : "primary"}
              onClick={() =>
                addStudentMode ? handleAddStudent() : setAddStudentMode(true)
              }
              startIcon={addStudentMode ? <AddIcon /> : null}
            >
              {addStudentMode ? "Add Student" : "Enable Add Student"}
            </AddStudentButton>
          </CardContent>
        </StyledCard>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoomDetail;
