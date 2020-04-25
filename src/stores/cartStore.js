import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _cart = [];
let _totalPrice = 0;

class CartStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  isProductInCart(id) {
    return _cart.find((prod) => prod._id === id);
  }

  getCartProducts() {
    return _cart;
  }

  getTotal() {
    return _totalPrice;
  }
}

const store = new CartStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.ADD_TO_CART:
      let product = action.product;
      if (_cart.find((prod) => prod._id === product._id)) {
        const selectedProduct = _cart.find((item) => item._id === product._id);
        const index = _cart.indexOf(selectedProduct);
        const sprod = _cart[index];
        sprod.count = sprod.count + 1;
      } else {
        product.count = 1;
        _cart.push(action.product);
      }
      _totalPrice = _totalPrice + product.price;
      store.emitChange();
      break;
    case actionTypes.DECREMENT:
      const selectedProduct = _cart.find((item) => item._id === action.id);
      const index = _cart.indexOf(selectedProduct);
      const sprod = _cart[index];
      sprod.count = sprod.count - 1;
      if (sprod.count === 0) {
        _cart = _cart.filter((prod) => prod._id !== action.id);
      }
      _totalPrice = _totalPrice - selectedProduct.price;
      store.emitChange();
      break;
    case actionTypes.REMOVE_FROM_CART:
      _totalPrice =
        _totalPrice -
        _cart.map((prod) => (prod._id === action.id ? prod.price : 0));
      _cart = _cart.filter((prod) => prod._id !== action.id);
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
