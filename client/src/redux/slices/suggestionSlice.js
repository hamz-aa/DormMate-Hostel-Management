// src/redux/suggestionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch all suggestions
export const fetchSuggestions = createAsyncThunk(
  "suggestions/fetchSuggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/suggestions`, {
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

// Async thunk to create a new suggestion
export const createSuggestion = createAsyncThunk(
  "suggestions/createSuggestion",
  async (suggestionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/suggestions/create`,
        suggestionData,
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

// Async thunk to delete a suggestion
export const deleteSuggestion = createAsyncThunk(
  "suggestions/deleteSuggestion",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/suggestions/remove/${id}`, {
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

const suggestionSlice = createSlice({
  name: "suggestions",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Suggestions
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Suggestion
      .addCase(createSuggestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSuggestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createSuggestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Suggestion
      .addCase(deleteSuggestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSuggestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (suggestion) => suggestion._id !== action.payload
        );
      })
      .addCase(deleteSuggestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default suggestionSlice.reducer;
