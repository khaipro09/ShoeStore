import { createAction } from "@reduxjs/toolkit";
import { REQUEST, TYPE_ACTION } from "../constants";

export const getTypeListAction = createAction(
  REQUEST(TYPE_ACTION.GET_TYPE_LIST)
);
export const createTypeAction = createAction(REQUEST(TYPE_ACTION.CREATE_TYPE));
export const editTypeAction = createAction(REQUEST(TYPE_ACTION.EDIT_TYPE));
export const deleteTypeAction = createAction(REQUEST(TYPE_ACTION.DELETE_TYPE));
