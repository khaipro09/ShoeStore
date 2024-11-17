import { createReducer } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

const initialState = {
  theme: "light",
  load: false,
};

const commonReducer = createReducer(initialState, {
  [COMMON_ACTION.CHANGE_THEME]: (state, action) => {
    return {
      ...state,
      theme: action.payload,
    };
  },
  [COMMON_ACTION.SET_LOADING]: (state, action) => {
    return {
      ...state,
      load: action.payload.load,
    };
  },
});

export default commonReducer;
