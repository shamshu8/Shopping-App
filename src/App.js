import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Cartreview from "./Components/Cartreview";
import LoginPage from "./Components/loginPage";
import Shopping from "./Components/Shopping";
import SignupPage from "./Components/SignupPage";
import ComponentOne from "./PropstoChild";

const ProctedRoute = (props) => {
  const { path, component, ...rest } = props;
  return (
    <Route
      {...rest}
      exact
      path={path}
      render={() => {
        if (sessionStorage.getItem("user-token") != null) {
          return component;
        } else {
          return (window.location.href = "/login");
        }
      }}
    />
  );
};
const PublicRoute = (props) => {
  const { path, component, ...rest } = props;
  return (
    <Route
      {...rest}
      exact
      path={path}
      render={() => {
        if (sessionStorage.getItem("user-token") == null) {
          return component;
        } else {
          return (window.location.href = "/Shopping");
        }
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      {/* <ComponentOne /> */}

      <h1>E commerce </h1>

      <Router>
        <Switch>
          <PublicRoute exact path="/login" component={<LoginPage />} />
          <PublicRoute exact path="/signup" component={<SignupPage />} />
          <ProctedRoute exact path="/Shopping" component={<Shopping />} />
          <ProctedRoute
            exact
            path="/product/checkout"
            component={<Cartreview />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
