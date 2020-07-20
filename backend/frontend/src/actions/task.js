import { api, API_BOARDS, API_TASKS, BASE } from "./api";
import * as actionTypes from "../actions/actionTypes";
import { transform } from "./etl";
import { setColumns } from "./columns";
import axios from "axios";
import { grabEvents, successBroadcast } from "./events";

export const apiTaskCreate = (card, colID, columnData) => {
  console.log("init a new card");
  var cardId;
  let newColumns = columnData;
  return (dispatch) => {
    let formData = new FormData();
    formData.append("title", card.content);
    formData.append("week", card.week);
    formData.append("column", colID);
    // formData.append("period", data.content);
    axios
      .post(`${BASE}/${API_TASKS}/`, formData)
      .then((res) => {
        const { id, title, week } = res.data;
        cardId = id;
        dispatch({
          type: actionTypes.SET_TASK_NAME,
          focus: false,
          id,
          title,
          week,
        });
      })
      .then(() => {
        card["id"] = cardId;
        newColumns.tasks[`task${cardId}`] = card;
        newColumns.columnsData["column" + colID].taskIds.push(`task${cardId}`);
        dispatch(setColumns({ ...newColumns }));
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
      });
  };
};

export const apiTaskStatusUpdate = (taskId, newColumnId, week, boardid) => {
  console.log("update task status");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("column", newColumnId);
    formData.append("week", week);

    axios
      .put(`${BASE}/${API_TASKS}/${taskId}/`, formData)
      .then((_) => {
        axios
          .get(`${BASE}/${API_BOARDS}/${boardid}/`)
          .then((res) => {
            // columns, labels, members, name, owner
            const { columns } = res.data;
            dispatch(setColumns(transform(columns)));
          })
          .then((_) => {
            dispatch(grabEvents());
          })
          .then((_) => {
            dispatch(successBroadcast("Event created successfully"));
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

export const apiTaskContentUpdate = (values, taskId, colId, boardid) => {
  console.log("update task content");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("column", colId);
    formData.append("week", values.week);
    formData.append("title", values.title);
    axios
      .put(`${BASE}/${API_TASKS}/${values.id}/`, formData)
      .then((res) => {
        axios
          .get(`${BASE}/${API_BOARDS}/${boardid}/`)
          .then((res) => {
            // columns, labels, members, name, owner
            const { columns } = res.data;
            dispatch(setColumns(transform(columns)));
            // dispatch(apiTitleUpdate(values.title));
          })
          .then(() => {
            dispatch(grabEvents());
          })
          .then((_) => {
            dispatch(successBroadcast("Task created successfully"));
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

export const apiTitleUpdate = (title) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_TASK_TITLE,
      title,
    });
  };
};

export const apiTaskDelete = (id, boardid) => {
  console.log("delete a new card");
  return (dispatch) => {
    axios
      .delete(`${BASE}/${API_TASKS}/${id}`)
      .then((_) => {
        axios
          .get(`${BASE}/${API_BOARDS}/${boardid}/`)
          .then((res) => {
            // columns, labels, members, name, owner
            const { columns } = res.data;
            dispatch(setColumns(transform(columns)));
          })
          .then((_) => {
            dispatch(successBroadcast("Task deleted successfully"));
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
