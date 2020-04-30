import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.carts, action) {
  switch (action.type) {
    case types.ADD_TO_CART_SUCCESS:
      return [...state, { ...action.product }];
    case types.REMOVE_FROM_CART_SUCCESS:
      return state.filter((item) => item._id !== action.id);
    case types.LOAD_CART_PRODUCTS_SUCCESS:
      return action.carts;
    default:
      return state;
  }
}
