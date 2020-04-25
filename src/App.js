import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Callback from "./components/Callback";
import Profile from "./components/Profile";

// Functions
import authStore from "./stores/authStore";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      error: "",
    };
    authStore.setHistory(props.history);
  }

  componentDidMount() {
    authStore.renewToken(this.loadProfile);
  }

  loadProfile(err, result) {
    if (err) {
      console.log(err);
    } else {
      authStore.getProfile((profile, err) => {
        this.setState({
          profile: profile,
          error: err,
        });
      });
    }
  }

  render() {
    return (
      <>
        <Navbar props={this.props} picture={this.state.profile.picture} />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/details/:id" component={Details} />
          <Route path="/callback" component={Callback} />
          <Route
            path="/profile"
            render={() => <Profile profile={this.state.profile} />}
          />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
      </>
    );
  }
}

export default App;
