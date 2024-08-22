import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch admin dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  "dashboard/fetchAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch student dashboard data
export const fetchStudentDashboard = createAsyncThunk(
  "dashboard/fetchStudentDashboard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/student/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    adminDashboard: {
      totalStudents: 0,
      availableRooms: 0,
      availableBeds: 0,
      paidVouchers: [],
      unpaidVouchers: [],
      feesCollected: 0,
      suggestions: 0,
      paymentHistory: {},
      hostelProgress: {},
      status: "idle",
      error: null,
    },
    studentDashboard: {
      totalAnnouncements: 0,
      roomRequest: "",
      feeStatus: "",
      paidVouchers: 0,
      unpaidVouchers: 0,
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin Dashboard
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.adminDashboard.status = "loading";
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.adminDashboard.status = "succeeded";
        state.adminDashboard = { ...state.adminDashboard, ...action.payload };
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.adminDashboard.status = "failed";
        state.adminDashboard.error = action.payload;
      })
      // Student Dashboard
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.studentDashboard.status = "loading";
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.studentDashboard.status = "succeeded";
        state.studentDashboard = {
          ...state.studentDashboard,
          ...action.payload,
        };
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.studentDashboard.status = "failed";
        state.studentDashboard.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
