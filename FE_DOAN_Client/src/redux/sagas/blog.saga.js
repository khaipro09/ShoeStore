import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, BLOG_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

import { ARTICLES_LIMIT } from "../../constants/acticle";

function* getBlogListSaga(action) {
  try {
    const page = action.payload?.page;
    const sortValue = action.payload?.sortValue;
    const searchKey = action.payload?.searchKey;
    const more = action.payload?.more;

    const sortObj = {
      _sort: sortValue?.split("-")[0],
      _order: sortValue?.split("-")[1],
    };

    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/blogs`,
      params: {
        _sort: sortObj?._sort || "id",
        _order: sortObj?._order || "desc",
        ...(page && {
          _page: page,
          _limit: ARTICLES_LIMIT,
        }),
        ...(searchKey && { q: searchKey }),
      },
    });

    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_LIST),
      payload: {
        data: result.data,
        total: result.headers["x-total-count"],
        page,
        more,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BLOG_ACTION.GET_BLOG_LIST),
      payload: e.message,
    });
  }
}

function* getBlogDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/blogs/${id}`,
      params: {},
    });

    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: e.message,
    });
  }
}

function* createBlogSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/blogs`, data);
    yield put({
      type: SUCCESS(BLOG_ACTION.CREATE_BLOG),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BLOG_ACTION.CREATE_BLOG),
      payload: e.message,
    });
  }
}

function* editBlogSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/blogs/${id}`, data);
    yield put({
      type: SUCCESS(BLOG_ACTION.EDIT_BLOG),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BLOG_ACTION.EDIT_BLOG),
      payload: e.message,
    });
  }
}

function* deleteBlogSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/blogs/${id}`);
    yield put({
      type: SUCCESS(BLOG_ACTION.DELETE_BLOG),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BLOG_ACTION.DELETE_BLOG),
      payload: e.message,
    });
  }
}

export default function* blogSaga() {
  yield debounce(300, REQUEST(BLOG_ACTION.GET_BLOG_LIST), getBlogListSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_DETAIL), getBlogDetailSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.CREATE_BLOG), createBlogSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.EDIT_BLOG), editBlogSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.DELETE_BLOG), deleteBlogSaga);
}
