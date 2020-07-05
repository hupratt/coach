import { api, API_BOARDS, API_TASKS, BASE } from "./api";
import * as actionTypes from "../actions/actionTypes";
import { transform } from "./etl";
import { setColumns } from "./columns";

export const apiTaskCreate = (data, id) => {
  console.log("init a new card");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("title", data.content);
    formData.append("description", data.content);
    formData.append("column", id);
    // formData.append("period", data.content);
    api
      .post(`${BASE}/${API_TASKS}/`, formData)
      .then((res) => {
        console.log("res", res);
        dispatch({
          type: actionTypes.SET_TASK_NAME,
          data: data.content,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
        console.log("err", JSON.stringify(err));
      });
  };
};

export const apiTaskStatusUpdate = (taskId, newColumnId) => {
  console.log("update task status");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("column", newColumnId);
    api
      .put(`${BASE}/${API_TASKS}/${taskId}/`, formData)
      .then((res) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
          .then((res) => {
            const { columns, labels, members, name, owner } = res.data;
            dispatch(setColumns(transform(columns)));
          })
          .catch((err) => {
            dispatch({ type: actionTypes.FAIL, error: err });
            console.log("err", JSON.stringify(err));
          });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
        console.log("err", JSON.stringify(err));
      });
  };
};

export const apiTaskContentUpdate = (values, taskId, colId) => {
  console.log("update task content");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("title", values.content);
    formData.append("column", colId);
    api
      .put(`${BASE}/${API_TASKS}/${taskId}/`, formData)
      .then((res) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
          .then((res) => {
            const { columns, labels, members, name, owner } = res.data;
            dispatch(setColumns(transform(columns)));
          })
          .catch((err) => {
            dispatch({ type: actionTypes.FAIL, error: err });
            console.log("err", JSON.stringify(err));
          });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
        console.log("err", JSON.stringify(err));
      });
  };
};

export const apiTaskDelete = (id) => {
  console.log("delete a new card");
  return (dispatch) => {
    api
      .delete(`${BASE}/${API_TASKS}/${id}`)
      .then((res) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
          .then((res) => {
            const { columns, labels, members, name, owner } = res.data;
            console.log("res.data", res.data);
            dispatch(setColumns(transform(columns)));
          })
          .catch((err) => {
            dispatch({ type: actionTypes.FAIL, error: err });
            console.log("err", JSON.stringify(err));
          });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
        console.log("err", JSON.stringify(err));
      });
  };
};
