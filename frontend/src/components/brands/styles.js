import colors from "../../colors";

export default {
  masterWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "75%",
    fontSize: "40px",
    color: colors.darkText,
  },
  brandsWrapper: {
    margin: "10px 0px",
    width: "75%",
    minWidth: "950px",
  },
  row: {
    display: "flex",
    justifyContent: "space-around",
  },
  itemWrapper: {
    margin: "10px 0px",
    background: colors.logoBlack,
  },
};
