import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import "./styles/styles.css";
import iconPhone from "./graphics/phoneIcon.png";
import iconLocation from "./graphics/locationIcon.png";
import iconCart from "./graphics/cartIcon.png";

function Navbar(props) {
  const handleSignInOut = () => {
    if (props.auth.user.id === undefined) {
      window.location.href = constants.routes.SIGN_IN;
    } else {
      props.logoutUser();
      window.location.href = constants.routes.HOME;
    }
  };

  //Admins do not need the cart functionality and regular users should not br able to access the admin section.
  //Getting the correct button accordingly.
  const cartOrAdminBtn = props.auth.user.admin ? (
    <Link to={constants.routes.ADMIN} className="nav-btn">
      {strings.admin}
    </Link>
  ) : (
    <Link to={constants.routes.CART} className="nav-btn">
      <div>{strings.cart}</div>
      <img src={iconCart} alt="" id="cart-icon" />
    </Link>
  );

  return (
    <div id="master-nav-wrapper">
      <div id="nav-btn-wrapper">
        <div id="left-wrapper">
          <div id="phone">
            <img alt="" src={iconPhone} className="nav-icon" />
            <div id="phone-content">{strings.phone}</div>
          </div>
          <div id="left-btn-wrapper">
            <Link to={constants.routes.BRANDS} className="nav-btn">
              {strings.watches}
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION} className="nav-btn">
              {strings.about}
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION} className="nav-btn">
              {strings.contact}
            </Link>
          </div>
        </div>
        <div id="logo">
          <Link to={constants.routes.HOME} id="logo-link">
            {strings.watchShop}
          </Link>
        </div>
        <div id="right-wrapper">
          <div id="address">
            <img alt="" src={iconLocation} className="nav-icon" />
            <div id="address-content">{strings.address}</div>
          </div>
          <div id="right-btn-wrapper">
            {cartOrAdminBtn}
            <div onClick={handleSignInOut} id="sign-in">
              {props.auth.user.id !== undefined
                ? strings.logOut
                : strings.signIn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
