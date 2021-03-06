import _ from "lodash";
import axios from "axios";

let _api = {};

_.each(["get", "post", "put", "delete"], (method) => {
  if (!localStorage.getItem("token")) return axios;
  _api[method] = (url, props, callbacks = {}) => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + localStorage.getItem("token");
    }
    if (method === "get") {
      return axios.get(url);
    } else if (method === "delete") {
      return axios.delete(url);
    } else if (method === "post") {
      return axios.post(url, props);
    } else if (method === "put") {
      return axios.put(url, props);
    }
  };
});

export const api = _api;

export const BASE = process.env.REACT_APP_BASE_URL;

// Available endpoints
export const API_LOGIN = `${BASE}/auth/login/`;
export const API_LOGOUT = `${BASE}/auth/logout/`;
export const API_USER = `${BASE}/auth/user-with-token/`;
export const API_TOKEN = `${BASE}/api-token-auth/`;
export const API_REGISTER = `${BASE}/auth/registration/`;
export const API_GUEST_REGISTER = "auth/guest/";

export const API_AVATARS = "api/avatars/";
export const API_BOARDS = "api/boards";
export const API_COLUMNS = "api/columns";
export const API_TASKS = "api/tasks";
export const API_EVENTS = "api/events";
export const API_LABELS = "api/labels/";
export const API_SORT_COLUMNS = "api/sort/column/";
export const API_SORT_TASKS = "api/sort/task/";
export const API_USERS = "api/users/";
export const API_SEARCH_USERS = "api/u/search/";
export const API_QUOTE = "static/quotes/quotedata.json";

export const googleLogin = `${BASE}/accounts/google/login/`;
export const facebookLogin = `${BASE}/accounts/facebook/login/`;
export const githubLogin = `${BASE}/accounts/github/login/`;
