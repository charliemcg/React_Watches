import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import constants from "../constants";

export const signUpUser = (userData, history) => (dispatch) => {
  console.log(`Attempting to create new user ${JSON.stringify(userData)}`);
  axios({
    url: "/graphql",
    method: "post",
    data: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // console.log(`created user ${JSON.stringify(res.data)}`);
      if (res.data.errors) {
        console.log(`Failed ${res.status}`);
        throw new Error(res.data.errors.message);
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
  console.log(userData);
  // axios
  //   .post(constants.api.SIGN_IN, userData)
  //   .then((res) => {
  //     const { token } = res.data;
  //     console.log(res);
  //     localStorage.setItem(constants.JWT_TOKEN, token);
  //     setAuthToken(token);
  //     const decoded = jwt_decode(token);
  //     // dispatch(setCurrentUser(decoded));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data,
  //     });
  //   });
  axios({
    url: "/graphql",
    method: "post",
    data: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(`Getting user ${JSON.stringify(res)}`);
      const { token } = res.data;
      localStorage.setItem(constants.JWT_TOKEN, token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(`cannot get user ${err}`);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
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

// const blah = {
//   data: { data: { user: { _id: "5ea251daa6140a0f0561fc79" } } },
//   status: 200,
//   statusText: "OK",
//   headers: {
//     connection: "close",
//     "content-length": "52",
//     "content-type": "application/json; charset=utf-8",
//     date: "Mon, 25 May 2020 11:32:06 GMT",
//     etag: 'W/"34-W2K5rQhc5E0k1k00CxV8jHbtT5o"',
//     vary: "Accept-Encoding",
//     "x-powered-by": "Express",
//   },
//   config: {
//     url: "/graphql",
//     method: "post",
//     data:
//       '{"query":"query User($email: String!, $password: String!) {\\n        user(email: $email, password: $password) {\\n          _id\\n        }\\n      }","variables":{"email":"test@user.com","password":"testuser"}}',
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//   },
//   request: {},
// };
