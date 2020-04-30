import React from "react";
import PayPalButton from "./PayPalButton";

export default function Checkout() {
  return (
    <div className="w-100">
      <div className="ml-auto">
        <PayPalButton />
      </div>
    </div>
  );
}
