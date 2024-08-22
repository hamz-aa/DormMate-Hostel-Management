// src/redux/roomsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch all rooms
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/rooms/all`, {
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

// Async thunk to create a new room
export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const adjustedRoomData = {
        ...roomData,
        room_no: parseFloat(roomData.room_no),
        price: parseFloat(roomData.price),
      };

      const response = await axios.post(
        `${baseUrl}/rooms/create`,
        adjustedRoomData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating room:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update a room
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/rooms/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating room:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a room
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/rooms/remove/${id}`, {
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

// Async thunk to approve a room request
export const approveRoomRequest = createAsyncThunk(
  "rooms/approveRoomRequest",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/rooms/approve`,
        requestData,
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

// Async thunk to get all room requests
export const fetchRoomRequests = createAsyncThunk(
  "rooms/fetchRoomRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/rooms/request/all`, {
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

// Async thunk to remove a student from a room
export const removeStudentFromRoom = createAsyncThunk(
  "rooms/removeStudentFromRoom",
  async ({ id, studentId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/rooms/remove-student/${id}`,
        { student_id: studentId },
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

// Async thunk to add a student to a room
export const addStudentToRoom = createAsyncThunk(
  "rooms/addStudentToRoom",
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/rooms/add-student/${id}`,
        { email },
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

// Async thunk to get a single room
export const getSingleRoom = createAsyncThunk(
  "rooms/getSingleRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    items: [],
    requests: [],
    currentRoom: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (room) => room._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((room) => room._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Approve Room Request
      .addCase(approveRoomRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(approveRoomRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requests = state.requests.filter((request) => {
          return (
            request.room_id !== action.payload.room_id &&
            request.student_id !== action.payload.student_id
          );
        });
      })
      .addCase(approveRoomRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Room Requests
      .addCase(fetchRoomRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requests = action.payload;
      })
      .addCase(fetchRoomRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Remove Student From Room
      .addCase(removeStudentFromRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeStudentFromRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeStudentFromRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Student To Room
      .addCase(addStudentToRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudentToRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Handle the state update if needed
      })
      .addCase(addStudentToRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Get Single Room
      .addCase(getSingleRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentRoom = action.payload;
      })
      .addCase(getSingleRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;
