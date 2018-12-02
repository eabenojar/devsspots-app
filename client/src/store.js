import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const intialState = {};

// const middleware = [thunk];

const store = createStore(rootReducer, intialState, applyMiddleware(thunk));

export default store;
