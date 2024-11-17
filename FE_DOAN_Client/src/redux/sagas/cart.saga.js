import { notification } from "antd";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, CART_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* addToCartSaga(action) {
  try {
    const { userId, carts } = action.payload;
    // const result = yield axios({
    //   method: "PUT",
    //   url: `${SERVER_API_URL}/v1/customers/${userId}`,
    //   data: {
    //     modelName: "customers",
    //     data: carts,
    //   },
    // });
    const data = {
      modelName: "customers",
      data: {carts: carts},
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    const result = yield axios.get(`${SERVER_API_URL}/v1/customers/${userId}?modelName=customers`);
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data: result.data.dataObject.carts,
      },
    });
    yield notification.success({
      message: "Thêm vào giỏ thành công!",
    });
  } catch (e) {
    yield put({ type: FAILURE(CART_ACTION.ADD_TO_CART), payload: e.message });
  }
}

function* plusItemCountSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const data = {
      modelName: "customers",
      data: {carts: carts},
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.PLUS_ITEM_COUNT),
      payload: {
        data: carts,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.PLUS_ITEM_COUNT),
      payload: e.message,
    });
  }
}

function* totalInfoOrderSaga(action) {
  try {
    const { orderInfo } = action.payload;
    yield put({
      type: SUCCESS(CART_ACTION.TOTAL_INFO_CHECKOUT),
      payload: {
        orderInfo: orderInfo,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.TOTAL_INFO_CHECKOUT),
      payload: e.message,
    });
  }
}

function* minusItemCountSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const data = {
      modelName: "customers",
      data: {carts: carts},
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.MINUS_ITEM_COUNT),
      payload: {
        data: carts,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.MINUS_ITEM_COUNT),
      payload: e.message,
    });
  }
}

function* deleteCartItemSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const data = {
      modelName: "customers",
      data: {carts: carts},
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.DELETE_CART_ITEM),
      payload: {
        data: carts,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.DELETE_CART_ITEM),
      payload: e.message,
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.PLUS_ITEM_COUNT), plusItemCountSaga);
  yield takeEvery(REQUEST(CART_ACTION.TOTAL_INFO_CHECKOUT), totalInfoOrderSaga);
  yield takeEvery(REQUEST(CART_ACTION.MINUS_ITEM_COUNT), minusItemCountSaga);
  yield takeEvery(REQUEST(CART_ACTION.DELETE_CART_ITEM), deleteCartItemSaga);
}
