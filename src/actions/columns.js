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
export const setColumnName = (data) => {
  console.log("init a new column");
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_COLUMN_NAME,
      data,
    });
  };
};
export const setAddColumn = (data) => {
  console.log("set data in the column");
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_ADD_COLUMN,
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
