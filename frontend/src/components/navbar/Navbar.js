import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";
import iconPhone from "./graphics/phoneIcon.png";
import iconLocation from "./graphics/locationIcon.png";

class Navbar extends Component {
  render() {
    return (
      <div style={styles.masterWrapper}>
        <nav>
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
                <Link
                  to={constants.routes.UNDER_CONSTRUCTION}
                  style={styles.btn}
                >
                  {strings.about}
                </Link>
                <Link
                  to={constants.routes.UNDER_CONSTRUCTION}
                  style={styles.btn}
                >
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
                <Link
                  to={constants.routes.UNDER_CONSTRUCTION}
                  style={styles.btn}
                >
                  {strings.cart}
                </Link>
                <Link to={constants.routes.ADMIN} style={styles.btn}>
                  {strings.admin}
                </Link>
                <Link to={constants.routes.SIGN_IN} style={styles.signIn}>
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
