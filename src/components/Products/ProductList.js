import React from "react";
import Product from "./Product";

export default function ProductList(props) {
  return (
    <>
      <div className="row">
        {props.products.map((product) => {
          return <Product key={product._ID} product={product} />;
        })}
      </div>
    </>
  );
}
