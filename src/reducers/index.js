import cardReducer from "./card";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// thunk allows to run async tasks in our action creators
import thunk from "redux-thunk";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  card: cardReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
