import { notification } from "antd";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, WISHLIST_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* addToWishlistSaga(action) {
  try {
    const { userId, wishList } = action.payload;
    const data = {
      modelName: "customers",
      data: { wishList: wishList },
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    const result = yield axios.get(`${SERVER_API_URL}/v1/customers/${userId}?modelName=customers`);
    yield put({
      type: SUCCESS(WISHLIST_ACTION.ADD_TO_WISHLIST),
      payload: {
        data: result?.data?.dataObject?.wishList,
      },
    });
    yield notification.success({
      message: "Thêm yêu thích thành công!",
    });
  } catch (e) {
    yield put({
      type: FAILURE(WISHLIST_ACTION.ADD_TO_WISHLIST),
      payload: e.message,
    });
  }
}

function* deleteWishlistItemSaga(action) {
  try {
    const { userId, wishList = [] } = action.payload;
    const data = {
      modelName: "customers",
      data: { wishList: wishList },
    };
    yield axios.put(`${SERVER_API_URL}/v1/customers/${userId}`, data);
    yield put({
      type: SUCCESS(WISHLIST_ACTION.DELETE_WISHLIST_ITEM),
      payload: {
        data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(WISHLIST_ACTION.DELETE_WISHLIST_ITEM),
      payload: e.message,
    });
  }
}

export default function* wishlistSaga() {
  yield takeEvery(REQUEST(WISHLIST_ACTION.ADD_TO_WISHLIST), addToWishlistSaga);
  yield takeEvery(REQUEST(WISHLIST_ACTION.DELETE_WISHLIST_ITEM), deleteWishlistItemSaga);
}
