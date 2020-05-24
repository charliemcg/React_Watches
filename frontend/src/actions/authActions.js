import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import constants from "../constants";

export const signUpUser = (userData, history) => (dispatch) => {
  console.log(`Attempting to create new user ${JSON.stringify(userData)}`);
  axios({
    // url: "http://localhost:5000/graphql",
    url: "/graphql",
    method: "post",
    data: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      console.log(`created user ${result.data}`);
    })
    .catch((err) => {
      console.log(`Cannot create user ${err}`);
    });
  // axios
  //   .post(constants.api.SIGN_UP, userData)
  //   .then((res) => history.push(constants.routes.SIGN_UP_SUCCESS))
  //   .catch((err) =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data,
  //     })
  //   );
  // fetch("http://localhost:3000/graphql", {
  //   method: "POST",
  //   body: JSON.stringify(userData),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => {
  //     console.log(`Creating new user ${res}`);
  //     if (res.status !== 200 && res.status !== 201) {
  //       console.log(`Failed ${res.status}`);
  //       throw new Error("Failed!");
  //     }
  //     // return res.json();
  //   })
  //   .then((resData) => {
  //     // if (resData.data.login.token) {
  //     //   this.context.login(
  //     //     resData.data.login.token,
  //     //     resData.data.login.userId,
  //     //     resData.data.login.tokenExpiration
  //     //   );
  //     // }
  //   })
  //   .catch((err) => {
  //     console.log(`Could not create user ${err}`);
  //   });
};

export const signInUser = (userData) => (dispatch) => {
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(`Getting user ${JSON.stringify(res)}`);
    })
    .then((resData) => {})
    .catch((err) => {
      console.log(`Could not get user ${err}`);
    });
  // axios
  //   .post("http://localhost:3000/graphql")
  //   .then((res) => {
  //     console.log(`Getting user ${JSON.stringify(res)}`);
  //     const { token } = res.data;
  //     localStorage.setItem(constants.JWT_TOKEN, token);
  //     setAuthToken(token);
  //     const decoded = jwt_decode(token);
  //     dispatch(setCurrentUser(decoded));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data,
  //     });
  //   });
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
