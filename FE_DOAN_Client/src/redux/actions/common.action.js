import { createAction } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

export const changeThemeAction = createAction(COMMON_ACTION.CHANGE_THEME);
export const setLoadingAction = createAction(COMMON_ACTION.SET_LOADING);
