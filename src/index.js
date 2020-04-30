import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <Route render={(props) => <App props={props} />} />
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);
