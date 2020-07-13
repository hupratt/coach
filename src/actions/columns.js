import axios from "axios";
import { api, API_BOARDS, API_COLUMNS, BASE } from "./api";
import * as actionTypes from "../actions/actionTypes";
import { transform } from "./etl";

export const setColumns = (columns) => {
  console.log("set column action");
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_COLUMNS,
      columns,
    });
  };
};

export const resetError = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_FAIL });
  };
};

export const deleteColumnById = (id, boardid) => {
  console.log("deleting column action");
  return (dispatch) => {
    api
      .delete(`${BASE}/${API_COLUMNS}/${id}/`)
      .then((res) => {
        api
          .get(`${BASE}/${API_BOARDS}/${boardid}/`)
          .then((res) => {
            // columns, labels, members, name, owner
            const { columns } = res.data;
            dispatch(setColumns(transform(columns)));
          })
          .catch((err) => {
            dispatch({ type: actionTypes.FAIL, error: err });
          });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
      });
  };
};

export const setColumnName = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_COLUMN_NAME,
      data,
    });
  };
};
export const triggerTogglePopUp = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_POPUP,
    });
  };
};
export const apiColumnCreate = (data, boardid) => {
  console.log("init a new column");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("title", data);
    formData.append("board", boardid);
    api
      .post(`${BASE}/${API_COLUMNS}/`, formData)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_COLUMN_NAME,
          data,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
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
