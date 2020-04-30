import React from "react";
import * as productActions from "../../redux/actions/productActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

// Components
import ProductList from "./ProductList";
import Title from "../common/Title";
import Spinner from "../common/Spinner";

class Products extends React.Component {
  componentDidMount() {
    const { products, actions } = this.props;

    if (products.length === 0) {
      actions.loadProducts().catch((error) => {
        alert("Loading products failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="py-5">
              <div className="container">
                <Title name="our" title="products" />
                <ProductList products={this.props.products} />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    products: state.products.length === 0 ? [] : state.products,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
