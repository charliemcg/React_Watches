import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import constants from "../constants";

export const signUpUser = (userData, history) => (dispatch) => {
  axios
    .post(constants.api.SIGN_UP, userData)
    .then((res) => history.push(constants.routes.SIGN_UP_SUCCESS))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const signInUser = (userData) => {
  axios
    .post(constants.api.SIGN_IN, userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem(constants.JWT_TOKEN, token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      setCurrentUser(decoded);
      // dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // });
    });
};

// export const signInUser = (userData) => (dispatch) => {
//   axios
//     .post(constants.api.SIGN_IN, userData)
//     .then((res) => {
//       const { token } = res.data;
//       localStorage.setItem(constants.JWT_TOKEN, token);
//       setAuthToken(token);
//       const decoded = jwt_decode(token);
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem(constants.JWT_TOKEN);
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
