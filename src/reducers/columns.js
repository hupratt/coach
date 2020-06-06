import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";
import data from "../data";

const initState = {
  loading: false,
  error: null,
  columns: data,
};

const setColumns = (state, action) => {
  return updateObject(state, {
    columns: action.data,
  });
};
const updateColumn = (state, action) => {
  return updateObject(state, {
    columns: action.data,
  });
};
const updateCard = (state, action) => {
  return updateObject(state, {
    columns: action.data,
  });
};
const addColumn = (state, action) => {
  return updateObject(state, {
    columns: action.data,
  });
};
const addCard = (state, action) => {
  console.log("state", action.data.name, action.data.id);
  // return updateObject(state, {
  //   [state.columns]: [...state.columns, ...action.data],
  // });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLUMNS:
      return setColumns(state, action);
    case actionTypes.ADD_CARD:
      return addCard(state, action);
    default:
      return state;
  }
};

export default reducer;
