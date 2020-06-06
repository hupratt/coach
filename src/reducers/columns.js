import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";
import data from "../data";

const initState = {
  loading: false,
  error: null,
  columns: data,
  addColumn: false,
  columnName: { column: "" },
};

const setColumns = (state, action) => {
  return updateObject(state, {
    columns: action.data,
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
    default:
      return state;
  }
};

export default reducer;
