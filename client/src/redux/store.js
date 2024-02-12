import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
//import thunk from "redux-thunk";
import { videogamesReducer } from "./reducer.js";

const composedEnhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware()
);

const store = createStore(videogamesReducer, composedEnhancers);

export default store;
