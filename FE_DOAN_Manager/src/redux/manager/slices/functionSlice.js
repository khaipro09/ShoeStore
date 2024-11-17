// manager/slices/functionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo async thunk để gọi API
export const fetchFunction = createAsyncThunk(
  'function/fetchFunction',
  async () => {
    const data = {
      modelName: 'functions'
    };

    const queryString = Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

    const response = await axios.get(`http://localhost:3001/v1/functions/?${queryString}`);
    return response.data;
  }
);

const initialState = {
  function: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const functionSlice = createSlice({
  name: 'function',
  initialState,
  reducers: {
    clearFunction: (state) => {
      state.function = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFunction.pending, (state) => {
        state.status = 'loading'; // Khi fetchFunction bắt đầu, set status thành 'loading'
      })
      .addCase(fetchFunction.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Khi fetchFunction thành công, set status thành 'succeeded'
        state.function = action.payload; // Lưu dữ liệu nhận được vào state
      })
      .addCase(fetchFunction.rejected, (state, action) => {
        state.status = 'failed'; // Khi fetchFunction thất bại, set status thành 'failed'
        state.error = action.error.message; // Lưu thông báo lỗi vào state
      });
  },
});

export const { clearFunction } = functionSlice.actions;
export default functionSlice.reducer;
