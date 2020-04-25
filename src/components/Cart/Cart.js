import React, { useState, useEffect } from "react";

// Components
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

// Functions
import {
  removeFromCart,
  decrement,
  addToCart,
} from "../../actions/cartActions";
import cartStore from "../../stores/cartStore";

export default function Cart(props) {
  const [products, setProducts] = useState(cartStore.getCartProducts());

  useEffect(() => {
    cartStore.addChangeListener(onChange);
    return () => cartStore.removeChangeListener(onChange);
  }, [products.length]);

  function onChange() {
    setProducts(cartStore.getCartProducts());
  }

  function increment(id) {
    let product = products.find((prod) => prod._id === id);
    addToCart(product);
    props.history.push("/cart");
  }

  function decrementProd(id) {
    decrement(id);
    props.history.push("/cart");
  }

  return (
    <>
      {products.length > 0 ? (
        <>
          <Title name="your" title="cart" />
          <CartColumns />
          {products.map((item) => {
            return (
              <CartItem
                key={item._ID}
                item={item}
                removeItem={removeFromCart}
                increment={increment}
                decrement={decrementProd}
              />
            );
          })}
          <CartTotals total={cartStore.getTotal()} />
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
