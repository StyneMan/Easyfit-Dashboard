import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import cmsReducer from "./slice/cms";
import ordersReducer from "./slice/orders";
import productsReducer from "./slice/products";
import supportReducer from "./slice/support";
import menuReducer from "./slice/menu";
import deliveryReducer from "./slice/deliveries";
import suppliersReducer from "./slice/suppliers";
import stocksReducer from "./slice/stocks";
import salesReducer from "./slice/sales";
import proofsReducer from "./slice/proofs";
import posReducer from "./slice/pos";

export default configureStore({
  reducer: {
    cms: cmsReducer,
    user: userReducer,
    sales: salesReducer,
    orders: ordersReducer,
    pos: posReducer,
    stocks: stocksReducer,
    proofs: proofsReducer,
    supports: supportReducer,
    products: productsReducer,
    menu: menuReducer,
    delivery: deliveryReducer,
    suppliers: suppliersReducer,
  },
});
