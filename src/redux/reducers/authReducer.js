import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN:
      return Object.assign(
        {},
        state,
        { authenticated: true },
        { user: action.user }
      );
    case types.LOGOUT:
      return Object.assign({}, state, { authenticated: false }, { user: {} });
    default:
      return state;
  }
}
