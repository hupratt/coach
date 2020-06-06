import axios from "axios";
import { BASE } from "../constants";
import { API_LOGIN } from "./api";
import * as actionTypes from "../actions/actionTypes";

export const setColumns = (data) => {
  console.log("init grab data from server");
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_COLUMNS,
      data,
    });
  };
};
export const addCard = (data) => {
  console.log("adding card");
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_CARD,
      data,
    });
  };
};
export const reoderColumns = () => {
  axios
    .post(
      `${BASE}/sort/column/`,
      {
        order: [12, 5, 7, 6, 17, 18],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log("res", res);
    });
};

export const data = () => {
  axios
    .get(`${BASE}/boards/2/`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log("res", res);
    });
};
