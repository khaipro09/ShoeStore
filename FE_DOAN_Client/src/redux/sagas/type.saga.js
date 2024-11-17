import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, TYPE_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getTypeListSaga(action) {
  try {
    const result = yield axios({
      method: "GET",
      url:`${SERVER_API_URL}/v1/categories?modelName=categories`,
    })
    const dataResult = result?.data?.dataObject;
    const dataCategory = dataResult.filter(c => c.isParent === false)
    yield put({
      type: SUCCESS(TYPE_ACTION.GET_TYPE_LIST),
      payload: {
        data: dataCategory,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.GET_TYPE_LIST),
      payload: e.message,
    });
  }
}

function* createTypeSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/types`, data);
    yield put({
      type: SUCCESS(TYPE_ACTION.CREATE_TYPE),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.CREATE_TYPE),
      payload: e.message,
    });
  }
}

function* editTypeSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/types/${id}`, data);
    yield put({
      type: SUCCESS(TYPE_ACTION.EDIT_TYPE),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.EDIT_TYPE),
      payload: e.message,
    });
  }
}

function* deleteTypeSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/types/${id}`);
    yield put({
      type: SUCCESS(TYPE_ACTION.DELETE_TYPE),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.DELETE_TYPE),
      payload: e.message,
    });
  }
}

export default function* typeSaga() {
  yield takeEvery(REQUEST(TYPE_ACTION.GET_TYPE_LIST), getTypeListSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.CREATE_TYPE), createTypeSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.EDIT_TYPE), editTypeSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.DELETE_TYPE), deleteTypeSaga);
}
