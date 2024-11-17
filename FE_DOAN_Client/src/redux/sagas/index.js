import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import userSaga from "./user.saga";
import categorySaga from "./category.saga";
import cartSaga from "./cart.saga";
import orderSaga from "./order.saga";
import typeSaga from "./type.saga";
import departmentSaga from "./department.saga";
import adminProductSaga from "./admin/product.saga";
import wishlistSaga from "./wishlist.saga";
import blogSaga from "./blog.saga";
import ticketSaga from "./ticket.saga";

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(categorySaga);
  yield fork(cartSaga);
  yield fork(orderSaga);
  yield fork(typeSaga);
  yield fork(departmentSaga);
  yield fork(adminProductSaga);
  yield fork(wishlistSaga);
  yield fork(blogSaga);
  yield fork(ticketSaga);
}
