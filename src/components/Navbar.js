import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import authStore from "../stores/authStore";
import { login, logout } from "../actions/authActions";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenRenewalComplete: false,
    };
  }

  componentDidMount() {
    try {
      authStore.renewToken(() => this.setState({ tokenRenewalComplete: true }));
    } catch (error) {
      return;
    }
  }

  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <i class="fas fa-store"></i>
        </Link>
        <ul className="navbar-nav align-items-center ml-auto">
          <li className="nav-item dropdown">
            <div class="dropdown">
              <button className="dropbtn">
                <img
                  className="rounded-circle"
                  style={{ maxWidth: 50, maxHeight: 50 }}
                  src="./img/profile_default.jpg"
                  alt="profile"
                />
              </button>
              <div class="dropdown-content">
                {authStore.isAuthenticated() ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/cart">Cart</Link>

                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <button onClick={login}>Login</button>
                )}
              </div>
            </div>
          </li>
        </ul>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
