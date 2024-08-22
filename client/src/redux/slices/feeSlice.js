// src/redux/feesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../resources/constants";

// Async thunk to fetch all fees
export const fetchFees = createAsyncThunk(
  "fees/fetchFees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/fees/all`, {
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

// Async thunk to create a fee voucher
export const createFeeVoucher = createAsyncThunk(
  "fees/createFeeVoucher",
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/fees/create`, feeData, {
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

// Async thunk to generate a fee voucher for a student
export const generateFeeVoucher = createAsyncThunk(
  "fees/generateFeeVoucher",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/fees/generate-voucher/${studentId}`,
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

// Async thunk to get vouchers for a specific month
export const fetchVouchersByMonth = createAsyncThunk(
  "fees/fetchVouchersByMonth",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/fees/month/${month}/${year}`,
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

// Async thunk to get vouchers for a specific student
export const fetchVouchersByStudent = createAsyncThunk(
  "fees/fetchVouchersByStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/fees/vouchers/${studentId}`,
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

// Async thunk to change fee status
export const changeFeeStatus = createAsyncThunk(
  "fees/changeFeeStatus",
  async ({ studentId, month }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/fees/change-status/${studentId}`,
        { month },
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

// Async thunk to update voucher
export const updateVoucher = createAsyncThunk(
  "fees/updateVoucher",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/fees/update-voucher/${id}`,
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

const feeSlice = createSlice({
  name: "fees",
  initialState: {
    items: [],
    vouchers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all fees
      .addCase(fetchFees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create fee voucher
      .addCase(createFeeVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFeeVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createFeeVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Generate fee voucher
      .addCase(generateFeeVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateFeeVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers.push(action.payload);
      })
      .addCase(generateFeeVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch vouchers by month
      .addCase(fetchVouchersByMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVouchersByMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchersByMonth.rejected, (state, action) => {
        state.vouchers = [];
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch vouchers by student
      .addCase(fetchVouchersByStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVouchersByStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchersByStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Change fee status
      .addCase(changeFeeStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeFeeStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the status in the state
        const voucher = state.vouchers.find(
          (voucher) => voucher._id === action.payload._id
        );
        if (voucher) {
          voucher.status = "Paid";
        }
      })
      .addCase(changeFeeStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update voucher
      .addCase(updateVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.vouchers.findIndex(
          (voucher) => voucher._id === action.payload._id
        );
        if (index !== -1) {
          state.vouchers[index] = action.payload;
        }
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default feeSlice.reducer;
