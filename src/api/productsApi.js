import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://ecomm-stores.herokuapp.com/";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
