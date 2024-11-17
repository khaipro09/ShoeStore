import { createAction } from "@reduxjs/toolkit";
import { REQUEST, WISHLIST_ACTION } from "../constants";

export const addToWishlistAction = createAction(
  REQUEST(WISHLIST_ACTION.ADD_TO_WISHLIST)
);
export const deleteWishlistItemAction = createAction(
  REQUEST(WISHLIST_ACTION.DELETE_WISHLIST_ITEM)
);
export const clearWishlistListAction = createAction(
  REQUEST(WISHLIST_ACTION.CLEAR_WISHLIST_LIST)
);
