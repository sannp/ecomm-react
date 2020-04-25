import React, { useState, useEffect } from "react";
import productStore from "../stores/productStore";
import Product from "./Product";
import Title from "./Title";
import { loadProducts } from "../actions/productActions";

export default function ProductList() {
  const [products, setProducts] = useState(productStore.getProducts());

  useEffect(() => {
    productStore.addChangeListener(onChange);
    if (products.length === 0) loadProducts();
    return () => productStore.removeChangeListener(onChange); // cleanup on unmount
  }, [products.length]);

  function onChange() {
    setProducts(productStore.getProducts());
  }

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map((product) => {
              return <Product key={product._ID} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
