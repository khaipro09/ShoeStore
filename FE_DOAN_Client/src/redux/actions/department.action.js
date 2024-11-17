import { createAction } from "@reduxjs/toolkit";
import { REQUEST, DEPARTMENT_ACTION } from "../constants";

export const getDepartmentListAction = createAction(
  REQUEST(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)
);
export const createDepartmentAction = createAction(
  REQUEST(DEPARTMENT_ACTION.CREATE_DEPARTMENT)
);
export const editDepartmentAction = createAction(
  REQUEST(DEPARTMENT_ACTION.EDIT_DEPARTMENT)
);
export const deleteDepartmentAction = createAction(
  REQUEST(DEPARTMENT_ACTION.DELETE_DEPARTMENT)
);
