import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { loadProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";

export function Details(props) {
  const products = useSelector((store) => store.products);
  const [product, setProduct] = useState({
    company: "",
    img: "",
    info: "",
    price: 0,
    title: "",
  });

  useEffect(() => {
    const id = props.match.params.id; // from the path `/details/:id`
    if (products.length !== 0) {
      findProduct(id);
    } else {
      props.actions.loadProducts();
    }
  }, [products.length]);

  function findProduct(id) {
    let prod = products.find((prod) => prod._id === id);
    setProduct(prod);
  }

  return (
    <div className="container py-5">
      {/* title */}
      <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
        <h1>{product.title}</h1>
      </div>
      {/* end title */}
      {/* product info */}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={product.img} className="img-fluid" alt="product" />
        </div>
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h2>model : {product.title}</h2>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by: <span className="text-uppercase">{product.company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price : <span>&#8377; </span>
              {product.price}
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about product:{" "}
          </p>
          <p className="text-muted lead">{product.info}</p>
          {/* Buttons */}
          <div>
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              onClick={() => {
                props.actions.addToCart(product);
                toast.success("Added to Cart");
                props.history.push("/cart");
              }}
            >
              Add to Cart
            </ButtonContainer>
            {/* <ButtonContainer
              cart
              disabled={
                cartStore.isProductInCart(props.match.params.id) ? true : false
              }
              onClick={() => {
                addToCart(product);
                props.history.push("/cart");
                // value.openModal(id);
              }}
            >
              {cartStore.isProductInCart(props.match.params.id)
                ? "inCart"
                : "add to cart"}
            </ButtonContainer> */}
          </div>
        </div>
      </div>
      {/* end product info */}
    </div>
  );
}

Details.propTypes = {
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
      loadProducts: bindActionCreators(loadProducts, dispatch),
      addToCart: bindActionCreators(addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
