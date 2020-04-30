import React from "react";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

// Components
import Title from "../common/Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import Checkout from "./Checkout";
import { toast } from "react-toastify";

export class Cart extends React.Component {
  componentDidMount() {
    const { carts, actions } = this.props;

    actions.loadCartProducts().catch((error) => {
      alert("Loading products failed" + error);
    });
  }

  increment = (id) => {};

  decrement = (id) => {};

  remove = (id) => {
    this.props.actions.removeFromCart(id);
    toast.success("Removed Item!");
  };

  getTotal = () => {
    let price = 0;
    this.props.carts.map((item) => (price = price + item.price));
    return price;
  };

  render() {
    return (
      <>
        <Title name="your" title="cart" />
        {this.props.carts.length > 0 ? (
          <>
            <CartColumns />
            {this.props.carts.map((item) => {
              return (
                <CartItem
                  key={item._ID}
                  item={item}
                  increment={this.increment}
                  decrement={this.decrement}
                  remove={this.remove}
                />
              );
            })}
            <CartTotals total={this.getTotal()} />
            <Checkout />
          </>
        ) : (
          <EmptyCart />
        )}
      </>
    );
  }
}

Cart.propTypes = {
  carts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    carts: state.carts.length === 0 ? [] : state.carts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCartProducts: bindActionCreators(
        cartActions.loadCartProducts,
        dispatch
      ),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
