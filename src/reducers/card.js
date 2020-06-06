import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  posts: [],
  pageCount: 0,
  pageStep: 10,
  moreloading: false,
  length: 0,
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const moreloading = (state, action) => {
  return updateObject(state, {
    moreloading: true,
  });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.data,
    error: null,
    loading: false,
    length: action.length,
  });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const loadMoar = (state, action) => {
  return updateObject(state, {
    offset: action.offset,
    data: [...state.data, ...action.data],
    error: null,
    bookPerPage: action.bookPerPage,
    moreloading: false,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_FETCH_POSTS:
      return loading(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_POSTS_FAIL:
      return fetchItemsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
