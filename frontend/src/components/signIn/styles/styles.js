import colors from "../../../colors";

export default {
  masterWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "75%",
  },
  title: {
    fontSize: "40px",
    margin: "10px",
  },
  signUp: {
    margin: "40px 10px",
  },
  signUpBtn: {
    textDecoration: "none",
    color: colors.darkText,
    padding: "6px 12px",
    fontSize: "12px",
    backgroundColor: colors.champagne,
    border: `1px solid ${colors.btnBorder}`,
    borderRadius: "10px",
  },
  form: {
    margin: "50px 0px",
  },
  inputWrapper: {
    margin: "10px",
    display: "flex",
  },
  label: {
    width: "10%",
    minWidth: "80px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "25%",
    minWidth: "220px",
    height: "20px",
  },
  inputWithError: {
    width: "25%",
    minWidth: "220px",
    height: "20px",
    border: "2px solid red",
  },
  error: {
    display: "flex",
    alignItems: "center",
    color: "red",
    width: "35%",
    minWidth: "300px",
    marginLeft: "15px",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "35%",
    marginTop: "20px",
  },
  btn: {
    height: "30px",
    width: "100px",
    border: `1px solid ${colors.btnBorder}`,
    borderRadius: "10px",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: colors.champagne,
  },
};
