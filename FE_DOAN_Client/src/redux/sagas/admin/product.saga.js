import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  PRODUCT_ACTION_ADMIN,
} from "../../constants";
import { SERVER_API_URL } from "../apiUrl";

function* getProductListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/products`,
      params: {
        _sort: "id",
        _order: "desc",
        _embed: "productOptions",
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN),
      payload: e.message,
    });
  }
}
function* createProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/products`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.CREATE_PRODUCT_ADMIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.CREATE_PRODUCT_ADMIN),
      payload: e.message,
    });
  }
}

function* editProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/products/${id}`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.EDIT_PRODUCT_ADMIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.EDIT_PRODUCT_ADMIN),
      payload: e.message,
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.DELETE_PRODUCT_ADMIN),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.DELETE_PRODUCT_ADMIN),
      payload: e.message,
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/products/${id}`,
      params: {
        _embed: "productOptions",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.GET_PRODUCT_DETAIL_ADMIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.GET_PRODUCT_DETAIL_ADMIN),
      payload: e.message,
    });
  }
}

function* createOptionAdminSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios({
      method: "POST",
      url: `${SERVER_API_URL}/productOptions`,
      data: data,
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.CREATE_OPTION),
      payload: {
        data: result.data,
      },
    });
    yield put({ type: REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN) });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.CREATE_OPTION),
      payload: {
        error: e.error,
      },
    });
  }
}

function* editOptionAdminSaga(action) {
  try {
    const { data, id } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `${SERVER_API_URL}/productOptions/${id}`,
      data: data,
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.EDIT_OPTION),
      payload: {
        data: result.data,
      },
    });
    yield put({ type: REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN) });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.EDIT_OPTION),
      payload: {
        error: e.error,
      },
    });
  }
}

function* deleteOptionAdminSaga(action) {
  try {
    const { id } = action.payload;
    yield axios({
      method: "DELETE",
      url: `${SERVER_API_URL}/productOptions/${id}`,
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION_ADMIN.DELETE_OPTION),
      payload: {
        data: { id },
      },
    });
    yield put({ type: REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN) });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION_ADMIN.DELETE_OPTION),
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* adminProductSaga() {
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.CREATE_PRODUCT_ADMIN),
    createProductSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.EDIT_PRODUCT_ADMIN),
    editProductSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.DELETE_PRODUCT_ADMIN),
    deleteProductSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.CREATE_OPTION),
    createOptionAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.DELETE_OPTION),
    deleteOptionAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.EDIT_OPTION),
    editOptionAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_DETAIL_ADMIN),
    getProductDetailSaga
  );
}
