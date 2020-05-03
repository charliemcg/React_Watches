import colors from "../../colors";

export default {
  background: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: colors.champagne,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  footerWrapper: {
    width: "80%",
    height: "100dp",
    display: "flex",
    justifyContent: "space-around",
  },
  columnWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "5px",
    color: colors.darkText,
  },
  link: {
    margin: "5px",
    textDecoration: "none",
    color: colors.darkText,
  },
  socialWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialIcon: {
    width: "20px",
    height: "20px",
    margin: "10px",
  },
};
