import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import SignUp from "./components/signUp/SignUp";
import SignUpSuccess from "./components/signUpSuccess/SignUpSuccess";
import SignIn from "./components/signIn/SignIn";
import Brands from "./components/brands/Brands";
import SelectedBrand from "./components/selectedBrand/SelectedBrand";
import Product from "./components/product/Product";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/ProductManagement";
import Footer from "./components/footer/Footer";
import UnderConstruction from "./components/underConstruction/UnderConstruction";
import FourOhFour from "./components/404/404";
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

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Router>
//           <div
//             style={{
//               backgroundColor: "#EEE",
//               minHeight: "100vh",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div style={{ height: "15vh" }}>
//               <Navbar />
//             </div>
//             <div style={{ minHeight: "73vh" }}>
//               <Switch>
//                 <Route exact path={constants.routes.HOME} component={Landing} />
//                 <Route
//                   exact
//                   path={constants.routes.SIGN_UP}
//                   component={SignUp}
//                 />
//                 <Route
//                   exact
//                   path={constants.routes.SIGN_UP_SUCCESS}
//                   component={SignUpSuccess}
//                 />
//                 <Route
//                   exact
//                   path={constants.routes.SIGN_IN}
//                   component={SignIn}
//                 />
//                 <Route exact path={constants.routes.ABOUT} component={About} />
//                 <Route
//                   exact
//                   path={constants.routes.CONTACT}
//                   component={Contact}
//                 />
//                 <Route exact path={constants.routes.CART} component={Cart} />
//                 <Route exact path={constants.routes.ADMIN} component={Admin} />
//                 <Route
//                   exact
//                   path={constants.routes.BRANDS}
//                   component={Brands}
//                 />
//                 <Route
//                   exact
//                   path={`${constants.routes.BRANDS}${constants.routes.PARAM_BRAND}`}
//                   component={SelectedBrand}
//                 />
//                 <Route
//                   exact
//                   path={`${constants.routes.PRODUCT}${constants.routes.PARAM_BRAND}${constants.routes.PARAM_ID}`}
//                   component={Product}
//                 />
//                 <Route
//                   exact
//                   path={`${constants.routes.UNDER_CONSTRUCTION}`}
//                   component={UnderConstruction}
//                 />
//                 <PrivateRoute
//                   exact
//                   path={constants.routes.DASHBOARD}
//                   component={Dashboard}
//                 />
//                 <Route component={FourOhFour} />
//               </Switch>
//             </div>
//             <div
//               style={{
//                 height: "12vh",
//                 display: "flex",
//                 alignItems: "flex-end",
//               }}
//             >
//               <Footer />
//             </div>
//           </div>
//         </Router>
//       </Provider>
//     );
//   }
// }

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div
          style={{
            backgroundColor: "#EEE",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: "15vh" }}>
            <Navbar />
          </div>
          <div style={{ minHeight: "73vh" }}>
            <Switch>
              <Route exact path={constants.routes.HOME} component={Landing} />
              <Route exact path={constants.routes.SIGN_UP} component={SignUp} />
              <Route
                exact
                path={constants.routes.SIGN_UP_SUCCESS}
                component={SignUpSuccess}
              />
              <Route exact path={constants.routes.SIGN_IN} component={SignIn} />
              <Route exact path={constants.routes.ABOUT} component={About} />
              <Route
                exact
                path={constants.routes.CONTACT}
                component={Contact}
              />
              <Route exact path={constants.routes.CART} component={Cart} />
              <Route exact path={constants.routes.ADMIN} component={Admin} />
              <Route exact path={constants.routes.BRANDS} component={Brands} />
              <Route
                exact
                path={`${constants.routes.BRANDS}${constants.routes.PARAM_BRAND}`}
                component={SelectedBrand}
              />
              <Route
                exact
                path={`${constants.routes.PRODUCT}${constants.routes.PARAM_BRAND}${constants.routes.PARAM_ID}`}
                component={Product}
              />
              <Route
                exact
                path={`${constants.routes.UNDER_CONSTRUCTION}`}
                component={UnderConstruction}
              />
              <PrivateRoute
                exact
                path={constants.routes.DASHBOARD}
                component={Dashboard}
              />
              <Route component={FourOhFour} />
            </Switch>
          </div>
          <div
            style={{
              height: "12vh",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
