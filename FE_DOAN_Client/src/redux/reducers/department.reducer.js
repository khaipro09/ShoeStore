import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAILURE, DEPARTMENT_ACTION } from "../constants";

const initialState = {
  departmentList: {
    data: [],
    load: false,
    error: null,
  },
};

const departmentReducer = createReducer(initialState, {
  [REQUEST(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        load: true,
      },
    };
  },
  [SUCCESS(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      departmentList: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        load: false,
        error,
      },
    };
  },

  [SUCCESS(DEPARTMENT_ACTION.CREATE_DEPARTMENT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        data: [data, ...state.departmentList.data],
      },
    };
  },

  [SUCCESS(DEPARTMENT_ACTION.EDIT_DEPARTMENT)]: (state, action) => {
    const { data } = action.payload;
    const newDepartmentList = [...state.departmentList.data];
    const departmentIndex = newDepartmentList.findIndex(
      (department) => department.id === data.id
    );
    newDepartmentList.splice(departmentIndex, 1, data);
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        data: newDepartmentList,
      },
    };
  },

  [SUCCESS(DEPARTMENT_ACTION.DELETE_DEPARTMENT)]: (state, action) => {
    const { id } = action.payload;
    const newDepartmentList = [...state.departmentList.data];
    const departmentIndex = newDepartmentList.findIndex(
      (department) => department.id === id
    );
    newDepartmentList.splice(departmentIndex, 1);
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        data: newDepartmentList,
      },
    };
  },
});

export default departmentReducer;
