import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAILURE, BLOG_ACTION } from "../constants";

const initialState = {
  blogList: {
    data: [],
    total: 0,
    page: 1,
    load: false,
    loadMore: false,
    error: null,
  },
  blogDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const blogReducer = createReducer(initialState, {
  [REQUEST(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    let page = action?.payload?.page;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        load: page <= 1 ? true : false,
        loadMore: true,
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { data, page, more, total } = action.payload;
    if (more) {
      return {
        ...state,
        blogList: {
          ...state.blogList,
          data: [...state.blogList.data, ...data],
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
        blogList: {
          ...state.blogList,
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
  [FAILURE(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        load: false,
        loadMore: false,
        error,
      },
    };
  },

  [REQUEST(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        load: true,
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        load: false,
        error,
      },
    };
  },

  [SUCCESS(BLOG_ACTION.CREATE_BLOG)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        data: [data, ...state.blogList.data],
      },
    };
  },

  [SUCCESS(BLOG_ACTION.EDIT_BLOG)]: (state, action) => {
    const { data } = action.payload;
    const newBlogList = [...state.blogList.data];
    const blogIndex = newBlogList.findIndex((blog) => blog.id === data.id);
    newBlogList.splice(blogIndex, 1, data);
    return {
      ...state,
      blogList: {
        ...state.blogList,
        data: newBlogList,
      },
    };
  },

  [SUCCESS(BLOG_ACTION.DELETE_BLOG)]: (state, action) => {
    const { id } = action.payload;
    const newBlogList = [...state.blogList.data];
    const blogIndex = newBlogList.findIndex((blog) => blog.id === id);
    newBlogList.splice(blogIndex, 1);
    return {
      ...state,
      blogList: {
        ...state.blogList,
        data: newBlogList,
      },
    };
  },
});

export default blogReducer;
