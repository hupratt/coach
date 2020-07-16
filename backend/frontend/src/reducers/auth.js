import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  user_staff: null,
  user_name: null,
  distinct_id: null,
  email: null,
  cookieConsent: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const grabTokenDistinctId = (state, action) => {
  return updateObject(state, {
    distinct_id: action.data,
    cookieConsent: action.cookies,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user_name: action.user_name,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const authIsStaff = (state, action) => {
  return updateObject(state, {
    user_staff: action.data.user_staff,
    user_name: action.data.user_name,
    email: action.data.email,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    // case actionTypes.USER_STAFF:
    //   return authIsStaff(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    // case actionTypes.AUTH_GRAB_TOKEN_DISTINCT_ID:
    //   return grabTokenDistinctId(state, action);
    default:
      return state;
  }
};

export default reducer;
