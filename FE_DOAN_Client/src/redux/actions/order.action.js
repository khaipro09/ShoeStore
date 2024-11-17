import { createAction } from '@reduxjs/toolkit';
import { REQUEST, ORDER_ACTION } from '../constants';

export const orderProductAction = createAction(REQUEST(ORDER_ACTION.ORDER_PRODUCT));
export const getOrderListAction = createAction(REQUEST(ORDER_ACTION.GET_ORDER_LIST));
export const editOrderListAction = createAction(REQUEST(ORDER_ACTION.EDIT_ORDER_LIST));
export const getOrderWaitingAction = createAction(REQUEST(ORDER_ACTION.GET_ORDER_WAITING));
export const getTotalSoldOrderWeek = createAction(REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK));
export const getTotalSoldOrderMonth = createAction(REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH));
