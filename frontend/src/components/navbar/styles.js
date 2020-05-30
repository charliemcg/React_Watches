import colors from "../../colors";

export default {
  masterWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "75%",
    minWidth: "500px",
  },
  leftWrapper: {
    width: "42%",
  },
  phone: {
    height: "40px",
    borderBottom: "1px solid black",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
  },
  icon: {
    width: "15px",
    height: "15px",
  },
  phoneContent: {
    color: colors.lightText,
    fontSize: "15px",
    padding: "10px",
  },
  address: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "40px",
    borderBottom: "1px solid black",
  },
  addressContent: {
    color: colors.lightText,
    fontSize: "15px",
    padding: "10px",
  },
  leftBtnWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rightBtnWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: colors.champagne,
    border: `1px solid ${colors.btnBorder}`,
    borderRadius: "40px",
    width: "14%",
  },
  logoLink: {
    textDecoration: "none",
    color: colors.darkText,
  },
  rightWrapper: {
    width: "42%",
  },
  btn: {
    textDecoration: "none",
    color: colors.darkText,
    display: "flex",
    alignItems: "center",
    height: "40px",
  },
  cartIcon: {
    width: "16px",
    marginLeft: "7px",
  },
  signIn: {
    textDecoration: "none",
    color: colors.darkText,
    backgroundColor: colors.champagne,
    border: `1px solid ${colors.btnBorder}`,
    borderRadius: "10px",
    padding: "8px 17px",
    fontSize: "13px",
    cursor: "pointer",
  },
};
