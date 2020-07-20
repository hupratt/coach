import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  error: null,
  loading: false,
  distinct_id: null,
  cookieConsent: null,
  user: {
    token: null,
    avatar: null,
    first_name: null,
    last_name: null,
    username: null,
    email: null,
  },
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
    error: null,
    loading: false,
    user: {
      token: action.user.token,
      username: action.user.username,
      first_name: action.user.first_name,
      last_name: action.user.last_name,
      avatar: action.user.avatar,
    },
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
    user: {
      token: null,
    },
  });
};

const authIsStaff = (state, action) => {
  return updateObject(state, {
    user: {
      user_staff: action.data.user_staff,
      user_name: action.data.user_name,
      email: action.data.email,
    },
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
