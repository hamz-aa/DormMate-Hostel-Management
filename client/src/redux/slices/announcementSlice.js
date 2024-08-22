// src/redux/announcementsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch all announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/announcements/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new announcement
export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (announcementData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/announcements/create`,
        announcementData,
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

// Async thunk to delete an announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/announcements/remove/${id}`, {
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

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Announcements
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Announcement
      .addCase(createAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Announcement
      .addCase(deleteAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (announcement) => announcement._id !== action.payload
        );
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default announcementSlice.reducer;
