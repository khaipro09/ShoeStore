import { createAction } from '@reduxjs/toolkit';
import { REQUEST, COMMON_ACTION_ADMIN } from '../../constants';

export const setProductSelectActionAdmin = createAction(REQUEST(COMMON_ACTION_ADMIN.SET_PRODUCT_SELECTED_ADMIN));