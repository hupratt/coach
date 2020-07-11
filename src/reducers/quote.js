import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  author: "",
  quote: "",
};

const setAuthorAndQuote = (state, action) => {
  return updateObject(state, {
    author: action.author,
    quote: action.quote,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GRAB_QUOTE:
      return setAuthorAndQuote(state, action);
    default:
      return state;
  }
};

export default reducer;
