import colors from "../../colors";

export default {
  masterWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uploadForm: {
    width: "75%",
  },
  title: {
    fontSize: "35px",
    marginBottom: "30px",
  },
  dropdownWrapper: {
    display: "flex",
    margin: "10px",
  },
  checkBoxWrapper: {
    display: "flex",
    margin: "20px 10px",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    minWidth: "110px",
  },
  dropdown: {
    width: "50%",
    minWidth: "235px",
  },
  complicationOptionsWrapper: {
    width: "50%",
    minWidth: "240px",
  },
  complicationRowWrapper: {
    display: "flex",
    margin: "10px",
  },
  complicationWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  complicationLabel: { color: colors.lightText },
  description: {
    width: "50%",
    height: "80px",
  },
  submitWrapper: {
    width: "65%",
    display: "flex",
    justifyContent: "center",
  },
  submitBtn: {
    height: "40px",
    width: "90px",
    marginTop: "30px",
    marginBottom: "20px",
    backgroundColor: colors.champagne,
    borderRadius: "5px",
    fontSize: "16px",
  },
};
