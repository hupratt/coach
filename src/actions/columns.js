import axios from "axios";
import { BASE } from "../constants";
import { API_LOGIN, api } from "./api";
import * as actionTypes from "../actions/actionTypes";
import { transform } from "./etl";

export const setColumns = (columns) => {
  console.log("set column data");
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_COLUMNS,
      columns,
    });
  };
};
export const initColumns = () => {
  console.log("init grab data from server");
  return (dispatch) => {
    api.get(`${BASE}/api/boards/2/`).then((res) => {
      const { columns, labels, members, name, owner } = res.data;
      dispatch(setColumns(transform(columns)));
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
