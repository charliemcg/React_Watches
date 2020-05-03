import colors from "../../colors";

export default {
  masterWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    // width: "1000px",
    width: "75%",
    minWidth: "500px",
    // height: "500px",
  },
  title: {
    color: colors.darkText,
    margin: "10px",
    paddingLeft: "20px",
    width: "75%",
    minWidth: "500px",
    fontSize: "50px",
  },
  watchesScrollWrapper: {
    display: "flex",
    overflow: "auto",
    backgroundColor: "white",
    width: "75%",
    minWidth: "500px",
    height: "270px",
    marginBottom: "20px",
  },
  itemWrapper: {
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "200px",
    height: "230px",
    color: colors.darkText,
  },
  thumbnail: {
    height: "200px",
    width: "200px",
  },
};
