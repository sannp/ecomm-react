import * as types from "./actionTypes";
import * as cartApi from "../../api/cartApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCartProductsSuccess(carts) {
  return { type: types.LOAD_CART_PRODUCTS_SUCCESS, carts };
}

export function addToCartSuccess(product) {
  return { type: types.ADD_TO_CART_SUCCESS, product };
}

export function removeFromCartSuccess(id) {
  return { type: types.REMOVE_FROM_CART_SUCCESS, id };
}

export function loadCartProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .getCartProducts()
      .then((products) => {
        dispatch(loadCartProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addToCart(product) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .addToCart(product)
      .then((prod) => {
        dispatch(addToCartSuccess(prod));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function removeFromCart(id) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .removeFromCart(id)
      .then((res) => {
        dispatch(removeFromCartSuccess(res.id));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
