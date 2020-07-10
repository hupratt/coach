import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  events: [],
};

const setEvents = (state, action) => {
  return updateObject(state, {
    events: action.events,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GRAB_EVENTS:
      return setEvents(state, action);
    default:
      return state;
  }
};

export default reducer;
