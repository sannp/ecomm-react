import React from "react";
import { Link } from "react-router-dom";
//import PayPayButton from './PayPalButton';

export default function CartTotals({ total = 0 }) {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            {/* <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={() => clearCart()}>clear cart</button>
                        </Link>   */}
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>&#8377; {total}</strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>
              <strong>&#8377; {total * 0.1}</strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>
              <strong>&#8377; {total + total * 0.1}</strong>
            </h5>
            {/* <PayPayButton total={cartTotal} clearCart={clearCart} history={history} /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
