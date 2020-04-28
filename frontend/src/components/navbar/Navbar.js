import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";

class Navbar extends Component {
  render() {
    return (
      <div style={styles.masterWrapper}>
        <nav>
          <div style={styles.btnWrapper}>
            <div style={styles.leftWrapper}>
              <div style={styles.phone}>
                <div style={styles.phoneContent}>{strings.phone}</div>
              </div>
              <div style={styles.leftBtnWrapper}>
                <Link to={constants.routes.BRANDS} style={styles.btn}>
                  {strings.watches}
                </Link>
                <Link to={constants.routes.ABOUT} style={styles.btn}>
                  {strings.about}
                </Link>
                <Link to={constants.routes.CONTACT} style={styles.btn}>
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
                <div style={styles.addressContent}>{strings.address}</div>
              </div>
              <div style={styles.rightBtnWrapper}>
                <Link to={constants.routes.CART} style={styles.btn}>
                  {strings.cart}
                </Link>
                <Link to={constants.routes.ADMIN} style={styles.btn}>
                  {strings.admin}
                </Link>
                <Link to={constants.routes.SIGN_IN} style={styles.btn}>
                  {strings.signIn}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
