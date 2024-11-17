import { notification } from "antd";
import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";
import { apiGetList, apiGetList2 } from "../../helper/helperServices";

import history from "../../utils/history";

function* loginSaga(action) {
  try {
    const { data } = action.payload;
    const reqData = {
      modelName: 'customers',
      data,
    };
    const result = yield call(axios.post, `${SERVER_API_URL}/v1/customers/login`, reqData);
    const userData = result?.data?.dataObject;

    yield call([localStorage, 'setItem'], "userInfo", JSON.stringify({
      data: userData?.data,
      token: result?.data?.dataObject?.token,
    }));

    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: userData,
      },
    });

    yield call(notification.success, {
      message: "Đăng nhập thành công!",
    });

    // Điều hướng người dùng dựa trên vai trò
    // if (result.data.dataObject.role === "admin") {
    //   yield call(history.push, "/admin");
    // } else {
    yield call(history.push, "/");
    // }
  } catch (e) {
    // Bắt và xử lý lỗi

    let errorMessage = 'Email hoặc mật khẩu không đúng!';
    const responseError = e?.response?.data?.error || "";
    if (responseError === "Email not active") {
      errorMessage = "Tài khoản không khả dụng";
    }

    // Dispatch hành động thất bại
    yield put({
      type: FAILURE(USER_ACTION.LOGIN),
      payload: {
        error: errorMessage,
      },
    });

    // Hiển thị thông báo lỗi
    yield call(notification.error, {
      message: "Đăng nhập thất bại",
      description: errorMessage,
    });
  }
}

function* registerSaga(action) {
  try {
    const { data } = action.payload;
    const reqRegister = {
      modelName: "customers",
      data,
    }
    // yield axios.post(`${SERVER_API_URL}/v1/customers/sigin`, reqRegister);
    yield axios.post(`http://localhost:3001/v1/customers/signin`, reqRegister);
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
    yield notification.success({
      message: (
        <div>
          Đăng ký thành công!<br />
          Vui lòng xác thực email trước khi đăng nhập!
        </div>
      )
    });
    yield history.push("/login");
  } catch (e) {
    if (e.response.data === "Email already exists") {
      yield put({
        type: FAILURE(USER_ACTION.REGISTER),
        payload: {
          error: "Email đã tồn tại!",
        },
      });
    } else {
      yield put({
        type: FAILURE(USER_ACTION.REGISTER),
        payload: {
          error: null,
        },
      });
    }
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/v1/customers/${id}?modelName=customers`,
      params: {
        _embed: "orders",
      },
    });

    const data = {
      modelName: "orders",
      byField: JSON.stringify({ customer: id })  // Chuyển đối tượng thành chuỗi JSON
    };

    const orderUser = yield apiGetList2(data);
    result.data.dataObject.orderList = orderUser.dataObject;

    console.log("🚀 ~ function*getUserInfoSaga ~ result:", result)
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: {
          ...result.data,
        },
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.GET_USER_INFO), payload: e.message });
  }
}

function* getUserListSage(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const role = action.payload?.role;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/users`,
      params: {
        _sort: "id",
        _order: "desc",
        _embed: "orders",
        ...(searchKey && { q: searchKey }),
        ...(role && { role: role }),
      },
    });
    // .get(`${SERVER_API_URL}/users?${role && `role=${role}`}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.GET_USER_LIST),
      payload: e.message,
    });
  }
}
function* editUserSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/users/${id}`, data);
    yield put({
      type: SUCCESS(USER_ACTION.EDIT_USER),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.EDIT_USER),
      payload: e.message,
    });
  }
}

function* editProfileSaga(action) {
  try {
    const { data } = action.payload;
    
    const result = yield axios.put(`${SERVER_API_URL}/v1/customers/updateCustomer/${data.id}`, data);
    yield put({
      type: SUCCESS(USER_ACTION.EDIT_USER_PROFILE),
      payload: {
        data: result?.data,
      },
    });
    yield notification.success({
      message: "Chỉnh sửa thành công!",
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.EDIT_USER_PROFILE),
      payload: {
        error: null,
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_LIST), getUserListSage);
  yield takeEvery(REQUEST(USER_ACTION.EDIT_USER), editUserSaga);
  yield takeEvery(REQUEST(USER_ACTION.EDIT_USER_PROFILE), editProfileSaga);
}
