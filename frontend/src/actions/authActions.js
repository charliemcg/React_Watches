import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import constants from "../constants";
import jwtDecode from "jwt-decode";

export const signUpUser = (userData, history) => (dispatch) => {
  axios({
    url: "/graphql",
    method: "post",
    data: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const { success, errors } = res.data.data.signUp;
      if (!success) {
        throw new Error(JSON.stringify(errors));
      }
      history.push(constants.routes.SIGN_UP_SUCCESS);
    })
    .catch((err) => {
      console.log(`Cannot create user ${err}`);
      //     dispatch({
      //       type: GET_ERRORS,
      //       payload: err.response.data,
      //     })
    });
};

export const signInUser = (userData) => (dispatch) => {
  axios({
    url: "/graphql",
    method: "post",
    data: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const { success, token, errors } = res.data.data.signIn;
      if (!success) {
        throw new Error(JSON.stringify(errors));
      }
      localStorage.setItem(constants.JWT_TOKEN, token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(`cannot get user ${err.message}`);
      dispatch({
        type: GET_ERRORS,
        payload: JSON.parse(err.message),
      });
    });
};

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
