import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, DEPARTMENT_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getDepartmentListSaga(action) {
  try {
    const result = yield axios.get(`${SERVER_API_URL}/departments`);
    yield put({
      type: SUCCESS(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST),
      payload: e.message,
    });
  }
}

function* createDepartmentSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/departments`, data);
    yield put({
      type: SUCCESS(DEPARTMENT_ACTION.CREATE_DEPARTMENT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(DEPARTMENT_ACTION.CREATE_DEPARTMENT),
      payload: e.message,
    });
  }
}

function* editDepartmentSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `${SERVER_API_URL}/departments/${id}`,
      data
    );
    yield put({
      type: SUCCESS(DEPARTMENT_ACTION.EDIT_DEPARTMENT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(DEPARTMENT_ACTION.EDIT_DEPARTMENT),
      payload: e.message,
    });
  }
}

function* deleteDepartmentSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/departments/${id}`);
    yield put({
      type: SUCCESS(DEPARTMENT_ACTION.DELETE_DEPARTMENT),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(DEPARTMENT_ACTION.DELETE_DEPARTMENT),
      payload: e.message,
    });
  }
}

export default function* departmentSaga() {
  yield takeEvery(
    REQUEST(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST),
    getDepartmentListSaga
  );
  yield takeEvery(
    REQUEST(DEPARTMENT_ACTION.CREATE_DEPARTMENT),
    createDepartmentSaga
  );
  yield takeEvery(
    REQUEST(DEPARTMENT_ACTION.EDIT_DEPARTMENT),
    editDepartmentSaga
  );
  yield takeEvery(
    REQUEST(DEPARTMENT_ACTION.DELETE_DEPARTMENT),
    deleteDepartmentSaga
  );
}
