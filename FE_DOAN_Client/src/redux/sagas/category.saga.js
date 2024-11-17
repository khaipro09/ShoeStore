import { put, takeEvery,debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, CATEGORY_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getCategoryListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "GET",
      url:`${SERVER_API_URL}/v1/categories?modelName=categories`,
      params: {
        _sort: "id",
        _order: "desc",
        _embed:"products",
        ...(searchKey && { q: searchKey }),
      },
    })
    const dataResult = result?.data?.dataObject;
    const dataCategory = dataResult.filter(c => c.isParent === true)
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: dataCategory,
      },
    });

  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: e.message,
    });
  }
}

function* createCategorySaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/categories`, data);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: e.message,
    });
  }
}

function* editCategorySaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `${SERVER_API_URL}/categories/${id}`,
      data
    );
    yield put({
      type: SUCCESS(CATEGORY_ACTION.EDIT_CATEGORY),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.EDIT_CATEGORY),
      payload: e.message,
    });
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/categories/${id}`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: e.message,
    });
  }
}

export default function* categorySaga() {
 
  yield debounce(
    300,
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
  yield takeEvery(REQUEST(CATEGORY_ACTION.CREATE_CATEGORY), createCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.EDIT_CATEGORY), editCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.DELETE_CATEGORY), deleteCategorySaga);
}
