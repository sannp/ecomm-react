import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Auth from "../redux/actions/authActions";

// Components
import Navbar from "./common/Navbar";
import ProductList from "./Products/Products";
import Details from "./Products/Details";
import Cart from "./Cart/Cart";
import Default from "./Default";
import Callback from "./Callback";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <>
        <Navbar
          login={Auth.login}
          logout={Auth.logout}
          profile={this.props.auth.user}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <ProductList {...props} />}
          />
          <Route path="/details/:id" component={Details} />
          <Route path="/callback" component={Callback} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
