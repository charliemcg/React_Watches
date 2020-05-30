import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";
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
    <Link to={constants.routes.ADMIN} style={styles.btn}>
      {strings.admin}
    </Link>
  ) : (
    <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.btn}>
      <div>{strings.cart}</div>
      <img src={iconCart} alt="" style={styles.cartIcon} />
    </Link>
  );

  return (
    <div style={styles.masterWrapper}>
      <div style={styles.btnWrapper}>
        <div style={styles.leftWrapper}>
          <div style={styles.phone}>
            <img alt="" src={iconPhone} style={styles.icon} />
            <div style={styles.phoneContent}>{strings.phone}</div>
          </div>
          <div style={styles.leftBtnWrapper}>
            <Link to={constants.routes.BRANDS} style={styles.btn}>
              {strings.watches}
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.btn}>
              {strings.about}
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.btn}>
              {strings.contact}
            </Link>
          </div>
        </div>
        <div style={styles.logo}>
          <Link to={constants.routes.HOME} style={styles.logoLink}>
            {strings.watchShop}
          </Link>
        </div>
        <div style={styles.rightWrapper}>
          <div style={styles.address}>
            <img alt="" src={iconLocation} style={styles.icon} />
            <div style={styles.addressContent}>{strings.address}</div>
          </div>
          <div style={styles.rightBtnWrapper}>
            {cartOrAdminBtn}
            <div onClick={handleSignInOut} style={styles.signIn}>
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
