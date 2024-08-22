// src/redux/studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/students/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update a student by ID
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/students/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to request a room change
export const requestRoomChange = createAsyncThunk(
  "students/requestRoomChange",
  async ({ id, roomNo }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/students/room-change/${id}`,
        { room_no: roomNo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a student by ID
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/students/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    items: [],
    student: null,
    status: "idle",
    error: null,
  },
  reducers: {
    updateProfileUrl: (state, action) => {
      state.student.profile_url = action.payload.profile_url;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student.name = action.payload.name;
        // const index = state.items.findIndex(
        //   (student) => student._id === action.payload._id
        // );
        // if (index !== -1) {
        //   state.items[index] = action.payload;
        // }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Request room change
      .addCase(requestRoomChange.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestRoomChange.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student.room_change_request = action.payload.room_change_request;
        // Handle the state update if needed
      })
      .addCase(requestRoomChange.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (student) => student._id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateProfileUrl } = studentSlice.actions;

export default studentSlice.reducer;
