import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAILURE, ORDER_ACTION } from "../../constants";

const initialState = {
  orderList: {
    data: [],
    load: false,
    error: null,
  },
  orderWaitingList: {
    data: [],
    load: false,
    error: null,
  },
  totalProductOrder: {
    dataWeek: [],
    dataMonth: [],
    totalWeek: 0,
    totalMonth: 0,
    load: false,
    error: null,
  },
};

const orderReducerAdmin = createReducer(initialState, {
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
    };
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
    };
  },
  [SUCCESS(ORDER_ACTION.EDIT_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    const newOrderList = [...state.orderList.data];
    const orderIndex = newOrderList.findIndex((order) => order.id === data.id);
    const newData = { ...newOrderList[orderIndex], status: data.status };
    newOrderList.splice(orderIndex, 1, newData);
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: newOrderList,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_WAITING)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderWaitingList: {
        data,
        load: false,
        error: null,
      },
    };
  },

  [REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK)]: (state, action) => {
    return {
      ...state,
      totalProductOrder: {
        ...state.totalProductOrder,
        load: true,
      },
    };
  },

  [SUCCESS(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK)]: (state, action) => {
    const { data } = action.payload;
    let countProduct = 0;

    data.forEach((item) => {
      countProduct =
        countProduct +
        item.products.reduce((total, itemPr) => {
          return total + itemPr.count;
        }, 0);
    });
    return {
      ...state,
      totalProductOrder: {
        ...state.totalProductOrder,
        dataWeek: data,
        totalWeek: countProduct,
        load: false,
        error: null,
      },
    };
  },

  [REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH)]: (state, action) => {
    return {
      ...state,
      totalProductOrder: {
        ...state.totalProductOrder,
        load: true,
      },
    };
  },

  [SUCCESS(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH)]: (state, action) => {
    const { data } = action.payload;
    let countProduct = 0;

    data.forEach((item) => {
      countProduct =
        countProduct +
        item.products.reduce((total, itemPr) => {
          return total + itemPr.count;
        }, 0);
    });
    return {
      ...state,
      totalProductOrder: {
        ...state.totalProductOrder,
        dataMonth: data,
        totalMonth: countProduct,
        load: false,
        error: null,
      },
    };
  },
});

export default orderReducerAdmin;
