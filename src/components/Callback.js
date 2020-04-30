import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Auth, { loginCallback } from "../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export class Callback extends Component {
  componentDidMount() {
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.authenticating();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }

  async authenticating() {
    let promise = new Promise((resolve, reject) => {
      Auth.handleAuthentication(resolve, reject);
    });
    let result = await promise; // wait until the promise resolves (*)
    this.props.loginCallback();
    toast.success("Login Successful");
  }

  render() {
    return (
      <>
        {!this.props.authenticated ? <h1>Loading...</h1> : <Redirect to="/" />}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginCallback: bindActionCreators(loginCallback, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
