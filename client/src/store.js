import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"] // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const intialState = {
  //   auth: {
  //     isAuthenticated: localStorage.getItem("session")
  //   }
};

// const middleware = [thunk];

// const store = createStore(rootReducer, intialState, applyMiddleware(thunk));

export default () => {
  let store = createStore(
    persistedReducer,
    intialState,
    applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
