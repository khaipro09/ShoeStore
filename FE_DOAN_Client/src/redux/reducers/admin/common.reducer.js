import { createReducer } from "@reduxjs/toolkit";
import {
  REQUEST,
  SUCCESS,
  COMMON_ACTION_ADMIN,
  PRODUCT_ACTION_ADMIN,
} from "../../constants";

const initialState = {
  productSelected: {},
};

const commonProductReducerAdmin = createReducer(initialState, {
  [REQUEST(COMMON_ACTION_ADMIN.SET_PRODUCT_SELECTED_ADMIN)]: (
    state,
    action
  ) => {
    return {
      ...state,
      productSelected: action.payload,
    };
  },
  [SUCCESS(PRODUCT_ACTION_ADMIN.CREATE_OPTION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productSelected: {
        ...state.productSelected,
        productOptions: [...state.productSelected.productOptions, data],
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION_ADMIN.EDIT_OPTION)]: (state, action) => {
    const { data } = action.payload;
    const newProductOptions = [...state.productSelected.productOptions];
    const optionIndex = newProductOptions.findIndex(
      (item) => item.id === data.id
    );
    newProductOptions.splice(optionIndex, 1, data);
    return {
      ...state,
      productSelected: {
        ...state.productSelected,
        productOptions: newProductOptions,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION_ADMIN.DELETE_OPTION)]: (state, action) => {
    const { data } = action.payload;
    const newProductOptions = [...state.productSelected.productOptions];
    const optionIndex = newProductOptions.findIndex(
      (item) => item.id === data.id
    );
    newProductOptions.splice(optionIndex, 1);
    return {
      ...state,
      productSelected: {
        ...state.productSelected,
        productOptions: newProductOptions,
      },
    };
  },
});
export default commonProductReducerAdmin;
