import axios from "axios";
import { BASE } from "../constants";
import { api, API_LOGIN } from "./api";

export const login = (username, password) => {
  api
    .post(`${BASE}/${API_LOGIN}`, {
      username,
      password,
    })
    .then((res) => {
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    });
};
