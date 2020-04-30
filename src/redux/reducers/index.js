import { combineReducers } from "redux";
import products from "./productReducer";
import carts from "./cartReducer";
import auth from "./authReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  products,
  carts,
  auth,
  apiCallsInProgress,
});
export default rootReducer;
