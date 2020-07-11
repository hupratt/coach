import { api, API_BOARDS, API_TASKS, BASE } from "./api";
import * as actionTypes from "../actions/actionTypes";
import { transform } from "./etl";
import { setColumns } from "./columns";

export const apiTaskCreate = (card, colID, columnData) => {
  console.log("init a new card");
  var cardId;
  console.log("whats up???", columnData);
  let newColumns = columnData;
  return (dispatch) => {
    let formData = new FormData();
    console.log("CARD", card);
    formData.append("title", card.title);
    formData.append("week", card.week);
    formData.append("column", colID);
    // formData.append("period", data.content);
    api
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
        console.log("newColumns", newColumns);
        newColumns.tasks[`task${cardId}`] = card;
        newColumns.columnsData["column" + colID].taskIds.push(`task${cardId}`);
        console.log("newColumns", newColumns);
        dispatch(setColumns({ ...newColumns }));
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
      });
  };
};

export const apiTaskStatusUpdate = (taskId, newColumnId, week) => {
  console.log("update task status");
  return (dispatch) => {
    let formData = new FormData();
    formData.append("column", newColumnId);
    formData.append("week", week);

    api
      .put(`${BASE}/${API_TASKS}/${taskId}/`, formData)
      .then((_) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
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

export const apiTaskContentUpdate = (values, taskId, colId) => {
  console.log("update task content");
  return (dispatch) => {
    let formData = new FormData();
    console.log("values check here", values);
    formData.append("title", values.title);
    formData.append("column", colId);
    formData.append("week", values.week);

    api
      .put(`${BASE}/${API_TASKS}/${values.id}/`, formData)
      .then((res) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
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

export const apiTitleUpdate = (title) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_TASK_TITLE,
      title,
    });
  };
};

export const apiTaskDelete = (id) => {
  console.log("delete a new card");
  return (dispatch) => {
    api
      .delete(`${BASE}/${API_TASKS}/${id}`)
      .then((_) => {
        api
          .get(`${BASE}/${API_BOARDS}/1/`)
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