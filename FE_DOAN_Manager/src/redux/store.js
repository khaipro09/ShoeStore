import { combineReducers, configureStore } from '@reduxjs/toolkit';
import functionReducer from './manager/slices/functionSlice';
import authReducer from './manager/slices/authSlice';

const rootReducer = combineReducers({
  functions: functionReducer,
  auths: authReducer, // Đổi tên reducer này thành auths
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
