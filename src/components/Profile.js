import React from "react";
import cartStore from "../stores/cartStore";
import authStore from "../stores/authStore";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

function Profile(props) {
  // 1. Redirect to login if not logged in.
  if (!authStore.isAuthenticated()) return authStore.login();
  const { profile } = props;
  if (!profile) return null;
  return (
    <div className="container text-center">
      <h1>Hi {profile.nickname}</h1>
      <p>{profile.name}</p>
      <img
        className="rounded-circle"
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile"
      />
      <p>
        Items in Cart : <span>{cartStore.getCartProducts().length}</span>
      </p>
      {cartStore.getCartProducts().length > 0 ? (
        <ButtonContainer>
          <Link to="/cart" className="outline-primary">
            Go To Cart
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Link to="/" className="outline-primary">
            Search Products
          </Link>
        </ButtonContainer>
      )}
    </div>
  );
}

export default Profile;
