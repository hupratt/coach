import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  addColumn: false,
  columnName: { column: "" },
  columns: {
    columnOrder: [],
    columnsData: { id: "", title: "", taskIds: [] },
    tasks: { id: "", content: "", weeks: [], week: "" },
  },
  popUp: false,
  boards: [],
  backgroundLoaded: false,
};

const togglePopUp = (state) => {
  return updateObject(state, {
    popUp: !state.popUp,
  });
};

const toggleBackground = (state) => {
  return updateObject(state, {
    backgroundLoaded: !state.backgroundLoaded,
  });
};

const setBoardIds = (state, action) => {
  console.log("action.boards", action.boards);
  return updateObject(state, {
    boards: action.boards,
  });
};
const Fail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false,
  });
};
const resetErrorOnFail = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const setColumns = (state, action) => {
  return updateObject(state, {
    columns: action.columns,
  });
};

const setColumnName = (state, action) => {
  return updateObject(state, {
    columnName: action.data,
  });
};

const setAddColumn = (state, action) => {
  return updateObject(state, {
    addColumn: action.data,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLUMNS:
      return setColumns(state, action);
    case actionTypes.SET_COLUMN_NAME:
      return setColumnName(state, action);
    case actionTypes.SET_ADD_COLUMN:
      return setAddColumn(state, action);
    case actionTypes.FAIL:
      return Fail(state, action);
    case actionTypes.RESET_FAIL:
      return resetErrorOnFail(state, action);
    case actionTypes.TOGGLE_POPUP:
      return togglePopUp(state, action);
    case actionTypes.SET_BOARD_IDS:
      return setBoardIds(state, action);
    case actionTypes.TOGGLE_BACKGROUND:
      return toggleBackground(state, action);
    default:
      return state;
  }
};

export default reducer;
