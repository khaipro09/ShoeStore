import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  ORDER_ACTION,
  CART_ACTION,
} from "../constants";
import { SERVER_API_URL } from "./apiUrl";
import history from "../../utils/history";

function* getOderListSaga(action) {
  try {
    const page = action.payload?.page;
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/orders`,
      params: {
        _sort: "id",
        _order: "desc",
        _expand: "user",
        ...(page && {
          _page: page,
          _limit: 10,
        }),
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.GET_ORDER_LIST),
      payload: e.message,
    });
  }
}

function* getOderListWaitingSaga(action) {
  try {
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/orders`,
      params: {
        status: "waiting",
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_WAITING),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.GET_ORDER_WAITING),
      payload: e.message,
    });
  }
}

function* orderProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/orders`, data);
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, {
      carts: [],
    });
    yield put({ type: CART_ACTION.CLEAR_CART_LIST });
    yield history.push("/");
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.ORDER_PRODUCT),
      payload: e.message,
    });
  }
}
function* editOrderListSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/orders/${id}`, data);
    yield put({
      type: SUCCESS(ORDER_ACTION.EDIT_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.EDIT_ORDER_LIST),
      payload: e.message,
    });
  }
}

function* getOrderWeekSaga(action) {
  try {
    const firstOfWeek = moment().startOf("isoweek").valueOf();
    const endOfWeek = moment().endOf("isoweek").valueOf();
    const timeRange = [firstOfWeek, endOfWeek];
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/orders`,
      params: {
        ...(timeRange && {
          createdAt_gte: timeRange[0],
          createdAt_lte: timeRange[1],
        }),
      },
    });

    yield put({
      type: SUCCESS(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK),
      payload: e.message,
    });
  }
}
function* getOrderMonthSaga(action) {
  try {
    const firstOfMonth = moment().startOf("month").valueOf();
    const endOfMonth = moment().endOf("month").valueOf();
    const timeRange = [firstOfMonth, endOfMonth];
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/orders`,
      params: {
        ...(timeRange && {
          createdAt_gte: timeRange[0],
          createdAt_lte: timeRange[1],
        }),
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH),
      payload: e.message,
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.EDIT_ORDER_LIST), editOrderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_ORDER_WAITING),
    getOderListWaitingSaga
  );
  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_WEEK),
    getOrderWeekSaga
  );
  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_TOTAL_SOLD_ORDER_MONTH),
    getOrderMonthSaga
  );
}
