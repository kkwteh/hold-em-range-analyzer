import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import { createScrollMiddleware } from "react-redux-scroll";
import { Provider } from "react-redux";
import App from "./components/App";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware, createScrollMiddleware())
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
