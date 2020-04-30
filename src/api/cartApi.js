import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://ecomm-stores.herokuapp.com/cart/";

export function getCartProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addToCart(product) {
  return fetch(baseUrl + "add", {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function removeFromCart(id) {
  return fetch(baseUrl + "remove/" + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
