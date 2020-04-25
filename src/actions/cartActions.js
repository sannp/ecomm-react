import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export function addToCart(product) {
  dispatcher.dispatch({
    actionType: actionTypes.ADD_TO_CART,
    product: product,
  });
}

export function decrement(id) {
  dispatcher.dispatch({
    actionType: actionTypes.DECREMENT,
    id: id,
  });
}

export function removeFromCart(id) {
  dispatcher.dispatch({
    actionType: actionTypes.REMOVE_FROM_CART,
    id: id,
  });
}
