import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, WISHLIST_ACTION, USER_ACTION } from "../constants";

const initialState = {
  wishList: {
    data: [],
    load: false,
    error: null,
  },
};

const wishlistReducer = createReducer(initialState, {
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wishList: {
        ...state.wishList,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wishList: {
        ...state.wishList,
        data: data?.dataObject?.wishList,
      },
    };
  },

  [SUCCESS(WISHLIST_ACTION.ADD_TO_WISHLIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wishList: {
        ...state.wishList,
        data: data,
      },
    };
  },

  [SUCCESS(WISHLIST_ACTION.DELETE_WISHLIST_ITEM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wishList: {
        ...state.wishList,
        data: data?.data?.wishList,
      },
    };
  },

  [WISHLIST_ACTION.CLEAR_WISHLIST_LIST]: (state, action) => {
    return {
      ...state,
      wishList: {
        ...state.wishList,
        data: [],
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      wishList: {
        data: [],
        load: false,
        error: null,
      },
    };
  },
});

export default wishlistReducer;
