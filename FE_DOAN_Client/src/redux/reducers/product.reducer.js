import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAILURE, PRODUCT_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    total: 0,
    page: 1,
    load: false,
    loadMore: false,
    error: null,
  },
  productDetail: {
    data: {},
    load: false,
    error: null,
  },
  commentList: {
    data: [],
    rate: 0,
    load: false,
    error: null,
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    let page = action?.payload?.page;
    const loadHome = action?.payload?.loadHome;
    if (loadHome) {
      page = 1;
    }
    return {
      ...state,
      productList: {
        ...state.productList,
        load: page <= 1 ? true : false,
        loadMore: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, page, more, total } = action.payload;
    if (more) {
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [...state.productList.data, ...data],
          total,
          page,
          load: false,
          loadMore: false,
          error: null,
        },
      };
    } else {
      return {
        ...state,
        productList: {
          ...state.productList,
          data,
          total,
          page: 1,
          load: false,
          loadMore: false,
          error: null,
        },
      };
    }
  },
  [FAILURE(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        load: false,
        loadMore: false,
        error,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: false,
        error,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST)]: (state, action) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST)]: (state, action) => {
    const { rate, data } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        data,
        rate: rate,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(PRODUCT_ACTION.GET_COMMENT_DETAIL_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.ADD_COMMENT_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        data: [data, ...state.commentList.data],
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: [data, ...state.productList.data],
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const newProductList = [...state.productList.data];
    const productIndex = newProductList.findIndex(
      (product) => product.id === data.id
    );
    newProductList.splice(productIndex, 1, data);
    return {
      ...state,
      productList: {
        ...state.productList,
        data: newProductList,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT)]: (state, action) => {
    const { id } = action.payload;
    const newProductList = [...state.productList.data];
    const productIndex = newProductList.findIndex(
      (product) => product.id === id
    );
    newProductList.splice(productIndex, 1);
    return {
      ...state,
      productList: {
        ...state.productList,
        data: newProductList,
      },
    };
  },
});

export default productReducer;
