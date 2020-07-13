import columnReducer from "./columns";
import quoteReducer from "./quote";
import eventReducer from "./events";
import taskReducer from "./tasks";
import authReducer from "./auth";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// thunk allows to run async tasks in our action creators
import thunk from "redux-thunk";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  columns: columnReducer,
  quote: quoteReducer,
  events: eventReducer,
  tasks: taskReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
