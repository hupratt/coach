import _ from "lodash";
import axios from "axios";

export const api = {};

_.each(["get", "post", "put", "delete"], (method) => {
  if (!localStorage.getItem("token")) return axios;
  api[method] = (url, props, callbacks = {}) => {
    axios.defaults.headers.common["Authorization"] =
      "Token " + localStorage.getItem("token");
    if (method === "get") {
      return axios.get(url);
    } else if (method === "delete") {
      return axios.delete(url);
    } else if (method === "post") {
      return axios.post(url, props);
    }
  };
});

// Available endpoints
export const API_LOGIN = "auth/login/";
export const API_LOGOUT = "auth/logout/";
export const API_REGISTER = "auth/registration/";
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
