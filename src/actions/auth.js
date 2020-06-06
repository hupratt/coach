import axios from "axios";
import { BASE } from "../constants";
import { API_LOGIN } from "./api";

export const login = () => {
  axios
    .post(`${BASE}/${API_LOGIN}`, {
      username: "admin",
      password: "admin",
    })
    .then((res) => {
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    });
};
