import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import SignUp from "./components/auth/SignUp";
import SignUpSuccess from "./components/auth/SignUpSuccess";
import SignIn from "./components/auth/SignIn";
import Brands from "./components/brands/Brands";
import DynamicBrand from "./components/brands/DynamicBrand";
import Product from "./components/product/Product";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import constants from "./constants";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./signIn";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path={constants.routes.HOME} component={Landing} />
            <Route exact path={constants.routes.SIGN_UP} component={SignUp} />
            <Route
              exact
              path={constants.routes.SIGN_UP_SUCCESS}
              component={SignUpSuccess}
            />
            <Route exact path={constants.routes.SIGN_IN} component={SignIn} />
            <Route exact path={constants.routes.BRANDS} component={Brands} />
            <Route
              path={`${constants.routes.DYNAMIC_BRAND}${constants.routes.PARAM_BRAND}`}
              component={DynamicBrand}
            />
            <Route
              path={`${constants.routes.PRODUCT}${constants.routes.PARAM_BRAND}${constants.routes.PARAM_MODEL}`}
              component={Product}
            />
            <Switch>
              <PrivateRoute
                exact
                path={constants.routes.DASHBOARD}
                component={Dashboard}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
