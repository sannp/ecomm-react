import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

// export function saveProduct(product) {
//   return productApi.saveProduct(product).then((savedProduct) => {
//     // Hey dispatcher, go tell all the stores that a Product was just created.
//     dispatcher.dispatch({
//       actionType: product.id
//         ? actionTypes.UPDATE_PRODUCT
//         : actionTypes.CREATE_PRODUCT,
//       product: savedProduct,
//     });
//   });
// }

export function loadProducts() {
  return fetch("http://localhost:5000/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({
        actionType: actionTypes.LOAD_PRODUCTS,
        products: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// export function deleteProduct(id) {
//   return productApi.deleteProduct(id).then(() => {
//     dispatcher.dispatch({
//       actionType: actionTypes.DELETE_PRODUCT,
//       id: id,
//     });
//   });
// }
