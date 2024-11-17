import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, TICKET_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getTicketListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/tickets`,
      params: {
        _sort: "id",
        _order: "desc",
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(TICKET_ACTION.GET_TICKET_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TICKET_ACTION.GET_TICKET_LIST),
      payload: e.message,
    });
  }
}

function* createTicketSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/tickets`, data);
    yield put({
      type: SUCCESS(TICKET_ACTION.CREATE_TICKET),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TICKET_ACTION.CREATE_TICKET),
      payload: e.message,
    });
  }
}

function* editTicketSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/tickets/${id}`, data);
    yield put({
      type: SUCCESS(TICKET_ACTION.EDIT_TICKET),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TICKET_ACTION.EDIT_TICKET),
      payload: e.message,
    });
  }
}

function* deleteTicketSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/tickets/${id}`);
    yield put({
      type: SUCCESS(TICKET_ACTION.DELETE_TICKET),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TICKET_ACTION.DELETE_TICKET),
      payload: e.message,
    });
  }
}

export default function* ticketSaga() {
  yield debounce(
    300,
    REQUEST(TICKET_ACTION.GET_TICKET_LIST),
    getTicketListSaga
  );
  yield takeEvery(REQUEST(TICKET_ACTION.CREATE_TICKET), createTicketSaga);
  yield takeEvery(REQUEST(TICKET_ACTION.EDIT_TICKET), editTicketSaga);
  yield takeEvery(REQUEST(TICKET_ACTION.DELETE_TICKET), deleteTicketSaga);
}
