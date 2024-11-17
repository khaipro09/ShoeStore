import { createAction } from '@reduxjs/toolkit';
import { REQUEST, PRODUCT_ACTION_ADMIN } from '../../constants';

export const getProductListActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_LIST_ADMIN));
export const getProductDetailActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.GET_PRODUCT_DETAIL_ADMIN));
export const createProductActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.CREATE_PRODUCT_ADMIN));
export const editProductActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.EDIT_PRODUCT_ADMIN));
export const deleteProductActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.DELETE_PRODUCT_ADMIN));
export const createOptionActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.CREATE_OPTION));
export const editOptionActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.EDIT_OPTION));
export const deleteOptionActionAdmin = createAction(REQUEST(PRODUCT_ACTION_ADMIN.DELETE_OPTION));