import colors from "../../../colors";

export default {
  masterWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topWrapper: {
    display: "flex",
    width: "75%",
    minWidth: "500px",
  },
  imageWrapper: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: colors.lightText,
  },
  image: {
    width: "80%",
    marginTop: "30px",
    cursor: "pointer",
  },
  zoom: {
    height: "30px",
    width: "50%",
    minWidth: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomIcon: {
    height: "50%",
    marginLeft: "10px",
  },
  fullImageWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  fullImageClose: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "30px",
    cursor: "pointer",
    color: "white",
  },
  detailsWrapper: {
    flex: 3,
    color: colors.darkText,
  },
  title: {
    fontSize: "50px",
  },
  model: {
    fontSize: "30px",
  },
  buyWrapper: {
    display: "flex",
  },
  priceWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: "40px",
    width: "100%",
  },
  btnWrapper: {
    display: "flex",
    alignItems: "flex-end",
    height: "75%",
    color: colors.darkText,
    textDecoration: "none",
  },
  buyBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.champagne,
    borderRadius: "6px",
    border: `1px solid ${colors.btnBorder}`,
    width: "110px",
    height: "100%",
  },
  financeBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    border: "1px solid #aaa",
    width: "110px",
    height: "100%",
    color: colors.darkText,
    marginLeft: "10px",
    textAlign: "center",
    fontSize: "13px",
    backgroundColor: "#ddd",
  },
  divider: {
    backgroundColor: colors.darkText,
    width: "100%",
    height: "1px",
    marginTop: "10px",
  },
  specs: {
    display: "flex",
    marginLeft: "20px",
  },
  properties: {
    flex: 1,
  },
  values: {
    flex: 3,
  },
  activityIndicator: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  others: {
    width: "75%",
    minWidth: "500px",
    color: colors.darkText,
    fontSize: "20px",
    marginBottom: "5px",
    marginLeft: "20px",
  },
  bottomWrapper: {
    display: "flex",
    overflow: "auto",
    backgroundColor: "white",
    width: "75%",
    minWidth: "500px",
    height: "270px",
    marginBottom: "20px",
  },
};