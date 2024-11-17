import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import productReducer from "./product.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import cartReducer from "./cart.reducer";
import wishlistReducer from "./wishlist.reducer";
import commonReducer from "./common.reducer";
import productReducerAdmin from "./admin/product.reducer";
import commonProductReducerAdmin from "./admin/common.reducer";
import orderReducerAdmin from "./admin/order.reducer";

import rootSaga from "../sagas";
import typeReducer from "./type.reducer";
import departmentReducer from "./department.reducer";
import orderReducer from "./order.reducer";
import blogReducer from "./blog.reducer";
import ticketReducer from "./ticket.reducer";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    categoryReducer: categoryReducer,
    cartReducer: cartReducer,
    commonReducer: commonReducer,
    typeReducer: typeReducer,
    wishlistReducer: wishlistReducer,
    departmentReducer: departmentReducer,
    productReducerAdmin: productReducerAdmin,
    orderReducer: orderReducer,
    blogReducer: blogReducer,
    ticketReducer: ticketReducer,
    commonProductReducerAdmin: commonProductReducerAdmin,
    orderReducerAdmin: orderReducerAdmin,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
