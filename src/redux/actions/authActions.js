import * as types from "./actionTypes";
import auth0 from "auth0-js";

// Stored outside class since private
// eslint-disable-next-line
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let _auth = null;

class Auth {
  history = null;
  userProfile = null;
  requestedScopes = "openid profile email";
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: "token id_token",
    scope: this.requestedScopes,
  });

  setHistory = (history) => {
    this.history = history;
  };

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = (res, rej) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        res(authResult);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    _auth = authResult;
    // set the time that the access token will expire
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    _scopes = authResult.scope || this.requestedScopes || "";

    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
    this.scheduleTokenRenewal();
  };

  isAuthenticated() {
    return new Date().getTime() < _expiresAt;
  }

  logout = () => {
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "https://phonesstore-react.netlify.app/",
    });
  };

  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error("No access token found.");
    }
    return _accessToken;
  };

  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }
}

export function loginSuccess() {
  return { type: types.LOGIN, user: _auth };
}

export function logoutSuccess() {
  return { type: types.LOGOUT };
}

export function loginCallback() {
  return function (dispatch) {
    dispatch(loginSuccess());
  };
}

export function logout(dispatch) {
  return dispatch(logoutSuccess());
}
// export function logout(dispatch) {
//   dispatch(beginApiCall());
//   return authApi
//     .logout()
//     .then(() => {
//       dispatch(logoutSuccess());
//     })
//     .catch((error) => {
//       dispatch(apiCallError(error));
//       throw error;
//     });
// }

export default Auth = new Auth();
