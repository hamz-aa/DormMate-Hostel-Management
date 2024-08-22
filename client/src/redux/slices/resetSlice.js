// src/redux/slices/resetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
});

export const { resetStore } = resetSlice.actions;

export default resetSlice.reducer;
