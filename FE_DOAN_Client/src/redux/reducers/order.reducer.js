import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS,FAILURE, ORDER_ACTION, USER_ACTION } from "../constants";

const initialState = {
  orderList: {
    data: [],
    load: false,
    error: null,
  },
};

const orderReducer = createReducer(initialState, {
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data.orders,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data.dataObject.orderList,
      },
    };
  },

  [SUCCESS(ORDER_ACTION.GET_USER_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    console.log("🚀 ~ 1[SUCCESS ~ data:", data)
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data.orders,
      },
    };
  },

  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: [...state.orderList.data, data],
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      orderList: {
        data: [],
        load: false,
        error: null,
      },
    };
  },
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: true,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: false,
        error,
      },
    }
  },
  [SUCCESS(ORDER_ACTION.EDIT_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    const newOrderList = [...state.orderList.data];
    const categoryIndex = newOrderList.findIndex((category) => category.id === data.id);
    newOrderList.splice(categoryIndex, 1, data);
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: newOrderList,
      },
    };
  },
});

export default orderReducer;
