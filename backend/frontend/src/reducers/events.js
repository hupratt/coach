import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  events: [],
  success: null,
};

const setEvents = (state, action) => {
  return updateObject(state, {
    events: action.events,
  });
};
const successBroadcast = (state, action) => {
  return updateObject(state, {
    success: action.message,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GRAB_EVENTS:
      return setEvents(state, action);
    case actionTypes.SUCCESS_EVENT_CREATED:
      return successBroadcast(state, action);
    default:
      return state;
  }
};

export default reducer;
