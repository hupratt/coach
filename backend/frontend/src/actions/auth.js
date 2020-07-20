import axios from "axios";
import { API_LOGIN, API_LOGOUT, BASE, API_REGISTER, API_USER } from "./api";
import * as actionTypes from "./actionTypes";

export const sociallogin = (platformUrl = "") => {
  return (dispatch) => {
    axios
      .get(API_USER)
      .then((res) => {
        const { token, avatar, username, first_name, last_name } = res.data;
        const user = {
          token,
          avatar,
          first_name,
          last_name,
          username,
        };
        // expire in 10 days
        const expirationDate = new Date(
          Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
        );
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(user));
      })
      .catch((err) => {
        !err.toString().includes("401") && dispatch(authFail(err));
        if (platformUrl.length > 0) {
          window.location.href = platformUrl;
        }
      });
  };
};

export const checkAuthTimeout = (secondsDelay) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(sociallogin());
    }, secondsDelay * 1000);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess({ user: { token } }));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(sociallogin());
    }
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// const grabCookies = () => {
//   return (dispatch) => {
//     dispatch({
//       type: actionTypes.AUTH_GRAB_TOKEN_DISTINCT_ID,
//       data: posthogCookieDistinctId(),
//       cookies: grabCookieConsent(),
//     });
//   };
// };

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${API_LOGIN}`, {
        username: username,
        password: password,
      })
      .then((res) => {
        // grab all user data with another axios call
        const { key } = res.data;
        const user = { token: key, username };
        const expirationDate = new Date(
          Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
        );
        localStorage.setItem("token", key);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + key;
        dispatch(authSuccess(user));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${API_REGISTER}`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        // const { token, avatar, username, first_name, last_name } = res.data;
        const { key } = res.data;
        const user = { token: key, username };
        // const user = {
        //   token,
        //   avatar,
        //   first_name,
        //   last_name,
        //   username,
        // };
        // expire in 10 days
        const expirationDate = new Date(
          Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
        );
        localStorage.setItem("token", key);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + key;
        dispatch(authSuccess(user));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
