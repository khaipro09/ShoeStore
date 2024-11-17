import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, PRODUCT_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

import { PRODUCT_LIMIT } from "../../constants/product";

function* getProductListSaga(action) {
  try {
    const page = action.payload?.page;
    const sortValue = action.payload?.sortValue;
    const categoriesSelected = action.payload?.categoriesSelected;
    const typesSelected = action.payload?.typesSelected;
    const departmentsSelected = action.payload?.departmentsSelected;
    const priceRange = action.payload?.priceRange;
    const searchKey = action.payload?.searchKey;
    const colorSelected = action.payload?.colorSelected;
    const more = action.payload?.more;

    const sortObj = {
      _sort: sortValue?.split("-")[0],
      _order: sortValue?.split("-")[1],
    };

    let categoryParams = "";
    if (Array.isArray(categoriesSelected)) {
      categoriesSelected.forEach((categoryId, categoryIndex) => {
        const andParams = categoryIndex < categoriesSelected.length - 1 ? "&" : "";
        categoryParams = categoryParams + `"category":"${categoryId}${andParams}"`;
      });
    } else if (categoriesSelected) {
      categoryParams = `"category":"${categoriesSelected}"`;
    }

    // let departmentParams = "";
    // if (departmentsSelected) {
    //   departmentsSelected.forEach((departmentId, departmentIndex) => {
    //     const andParams =
    //       departmentIndex < departmentsSelected.length - 1 ? "&" : "";
    //     departmentParams =
    //       departmentParams + `departmentId=${departmentId}${andParams}`;
    //   });
    // }

    let typeParams = "";
    if (Array.isArray(typesSelected)) {
      typesSelected.forEach((typeId, categoryIndex) => {
        const andParams = categoryIndex < typesSelected.length - 1 ? "&" : "";
        typeParams = typeParams + `"brand":"${typeId}${andParams}"`;
      });
    } else if (typesSelected) {
      typeParams = `"brand":"${typesSelected}"`;
    }

    // let colorParams = "";
    // if (colorSelected) {
    //   colorSelected.forEach((colorCode, colorIndex) => {
    //     const andParams = colorIndex < colorSelected.length - 1 ? "&" : "";
    //     colorParams = colorParams + `color=${colorCode}${andParams}`;
    //   });
    // }

    let url = `${SERVER_API_URL}/v1/products?modelName=products`;
    if (categoriesSelected?.length && typesSelected?.length) {
      url = url + `&byField={${categoryParams}, ${typeParams}}`;
    } else if (categoriesSelected?.length) {
      url = url + `&byField={${categoryParams}}`
    } else if (typesSelected?.length) {
      url = url + `&byField={${typeParams}}`
    }

    if(searchKey && searchKey !== '') {
      url = url + `&keySearch=${searchKey}`
    }
      // url = categoriesSelected?.length > 0 ? url + `&byField={${categoryParams}}` : url;
      // url = t?.length > 0 ? url + `&byField={${categoryParams}}` : url;

      // if (typesSelected?.length > 0) {
      //   if (categoriesSelected?.length > 0) {
      //     url = url + `&${typeParams}`;
      //   } else {
      //     url = url + `?${typeParams}`;
      //   }
      // }
      // if (departmentsSelected?.length > 0) {
      //   if (categoriesSelected?.length > 0 || typesSelected?.length > 0) {
      //     url = url + `&${departmentParams}`;
      //   } else {
      //     url = url + `?${departmentParams}`;
      //   }
      // }

      // if (colorSelected?.length > 0) {
      //   if (
      //     categoriesSelected?.length > 0 ||
      //     typesSelected?.length > 0 ||
      //     departmentsSelected?.length > 0
      //   ) {
      //     url = url + `&${colorParams}`;
      //   } else {
      //     url = url + `?${colorParams}`;
      //   }
      // }

      const result = yield axios({
        method: "GET",
        url,
        params: {
          _sort: sortObj?._sort || "id",
          _order: sortObj?._order || "desc",
          _expand: ["department", "category", "type"],
          _embed: ["comments", "productOptions"],
          ...(page && {
            _page: page,
            _limit: PRODUCT_LIMIT,
          }),
          ...(priceRange && {
            price_gte: priceRange[0],
            price_lte: priceRange[1],
          }),
          ...(searchKey && { q: searchKey }),
        },
      });

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result?.data?.dataObject,
        total: result.headers["x-total-count"],
        page,
        more,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: e.message,
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    let url = `${SERVER_API_URL}/v1/products/${id}?modelName=products`;
    const result = yield axios({
      method: "GET",
      url,
      params: {
        _embed: ["productOptions", "comments"],
        _expand: ["department", "category", "type"],
      },
    });

    // const productDetailData = {
    //   ...result.data,
    //   rate:
    //     result.data.comments.length === 0
    //       ? 0
    //       : Math.round(
    //           (result.data.comments.reduce(
    //             (result, comment) => (result += comment.rating),
    //             0
    //           ) /
    //             result.data.comments.length) *
    //             2
    //         ) / 2,
    // };
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data.dataObject,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: e.message,
    });
  }
}

function* getCommentDetailListSaga(action) {
  try {
    const { idProduct } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/comments`,
      params: {
        productId: idProduct,
        _expand: ["user"],
      },
    });
    const rate =
      result.data.length === 0
        ? 0
        : Math.round(
          (result.data.reduce(
            (result, comment) => (result += comment.rating),
            0
          ) /
            result.data.length) *
          2
        ) / 2;

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST),
      payload: {
        data: result.data,
        rate: rate,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST),
      payload: e.message,
    });
  }
}

function* addCommentProductSaga(action) {
  try {
    const { idProduct, idUser, data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/comments`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.ADD_COMMENT_PRODUCT),
      payload: {
        idProduct,
        idUser,
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.ADD_COMMENT_PRODUCT),
      payload: e.message,
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/products`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: e.message,
    });
  }
}

function* editProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/products/${id}`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.EDIT_PRODUCT),
      payload: e.message,
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: e.message,
    });
  }
}

export default function* productSaga() {
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.EDIT_PRODUCT), editProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST),
    getCommentDetailListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.ADD_COMMENT_PRODUCT),
    addCommentProductSaga
  );
}
