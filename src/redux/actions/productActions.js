import * as types from "./actionTypes";
import * as productsApi from "../../api/productsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productsApi
      .getProducts()
      .then((products) => {
        dispatch(loadProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
