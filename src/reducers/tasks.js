import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  values: {
    id: "",
    title: "",
    button: "",
    focus: false,
    id: "",
    week: "",
    weeks: [],
  },
};

const setTaskData = (state, action) => {
  return updateObject(state, {
    values: {
      id: action.id,
      title: action.title,
      week: action.week,
      focus: action.focus,
    },
  });
};
const setTaskTitle = (state, action) => {
  return updateObject(state, {
    values: {
      title: action.title,
    },
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_TASK_NAME:
      return setTaskData(state, action);
    case actionTypes.SET_TASK_TITLE:
      return setTaskTitle(state, action);
    default:
      return state;
  }
};

export default reducer;
