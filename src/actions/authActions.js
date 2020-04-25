import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export function login() {
  dispatcher.dispatch({
    actionType: actionTypes.LOGIN,
  });
}

export function logout() {
  dispatcher.dispatch({
    actionType: actionTypes.LOGOUT,
  });
}
