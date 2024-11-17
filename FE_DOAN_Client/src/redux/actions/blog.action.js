import { createAction } from "@reduxjs/toolkit";
import { REQUEST, BLOG_ACTION } from "../constants";

export const getBlogListAction = createAction(
  REQUEST(BLOG_ACTION.GET_BLOG_LIST)
);
export const getBlogDetailAction = createAction(
  REQUEST(BLOG_ACTION.GET_BLOG_DETAIL)
);
export const createBlogAction = createAction(REQUEST(BLOG_ACTION.CREATE_BLOG));
export const editBlogAction = createAction(REQUEST(BLOG_ACTION.EDIT_BLOG));
export const deleteBlogAction = createAction(REQUEST(BLOG_ACTION.DELETE_BLOG));
