import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      console.log("🚀 ~ after ~ state:", JSON.stringify(state))
      state.employee = action.payload.dataObject;
      state.isAuthenticated = true;
      console.log("🚀 ~ after ~ state:", JSON.stringify(state))
    },
    logout(state) {
      state.employee = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
