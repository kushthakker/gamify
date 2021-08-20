import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./components/App";
import reducers from "./reducers";
import { ChakraProvider } from "@chakra-ui/react";
// import "./index.css";
import thunk from "redux-thunk";
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.querySelector("#root")
);
