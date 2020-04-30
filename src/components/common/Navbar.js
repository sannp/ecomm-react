import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar({ profile = null, login, logout }) {
  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
      <Link to="/">
        <i className="fas fa-store"></i>
        <span>Phones</span>
      </Link>
      <ul className="navbar-nav align-items-center ml-auto">
        <li className="nav-item dropdown">
          <div className="dropdown">
            <button className="dropbtn">
              <img
                className="rounded-circle"
                style={{ maxWidth: 50, maxHeight: 50 }}
                src="./img/profile_default.jpg"
                alt="profile"
              />
            </button>
            <div className="dropdown-content">
              {profile === null || Object.keys(profile).length === 0 ? (
                <button onClick={login}>Login</button>
              ) : (
                <>
                  <Link to="/cart">Cart</Link>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
