import axios from "axios";
import { API_LOGIN, API_LOGOUT, BASE, API_REGISTER, API_USER } from "./api";
import * as actionTypes from "./actionTypes";

export const login = (username, password) => {
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.withCredentials = true;
  axios
    .post(`${BASE}/${API_LOGIN}`, {
      username,
      password,
      xsrfHeaderName: "X-CSRFToken",
    })
    .then((res) => {
      const token = res.data.key;
      // expire in 7 days
      const expirationDate = new Date(new Date().getTime() + 3600 * 24 * 7);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    });
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      console.log("expirationDate", expirationDate);
      if (expirationDate > new Date()) {
        console.log("registering the token");
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(token));
      } else {
        dispatch(logout());
      }
    } else {
      axios
        .get(API_USER)
        .then((res) => {
          const { token } = res.data;
          // expire in 7 days
          const expirationDate = new Date(new Date().getTime() + 3600 * 24 * 7);
          localStorage.setItem("token", token);
          localStorage.setItem("expirationDate", expirationDate);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          dispatch(authSuccess(token));
        })
        .catch((err) => {
          dispatch(authFail(err));
        });
    }
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, username = null) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
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

// const userIsStaff = () => {
//   return (dispatch) => {
//     axios
//       .get(`${endpoint}/user-staff/`)
//       .then((res) => {
//         const { user_name, user_staff, email } = res.data;
//         const data = { user_name, user_staff, email };
//         dispatch({ type: actionTypes.USER_STAFF, data });
//       })
//       .catch((err) => {
//         dispatch(authFail(err));
//       });
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
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        // dispatch(userIsStaff());
        dispatch(authSuccess(token, username));
        // dispatch(checkAuthTimeout(36000));
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
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(token, username));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
