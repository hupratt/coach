import axios from "axios";
import { API_LOGIN, BASE } from "./api";

export const login = (username, password) => {
  axios
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
