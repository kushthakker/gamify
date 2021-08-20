import React, { useCallback, useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { error } from "../actions";
import SideBarMemoized from "./Sidebar";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Serach from "../pages/Search";
import ErrorPage from "../pages/Error";
import { AnimatePresence } from "framer-motion";

const Div = styled.div`
  max-width: 100vw;
  height: 100vh;
  overscroll-behavior-y: none;
  overflow-y: "hidden";
  box-sizing: border-box;
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App = () => {
  // const dispatch = useDispatch();

  // const Increment = useCallback(() => dispatch(error()), [dispatch]);

  // const reduxValue = useSelector((state) => state.error);

  // return (
  //   <div>
  //     <ErrorBoundary fallBackComponent={ErrorFallback}>
  //       <div
  //         css={{
  //           color: "red",
  //           fontSize: "20px",
  //           margin: "30px",
  //         }}
  //       >
  //         BoilerPlate
  //       </div>
  //       <MyIncrementButton onIncrement={Increment} />
  //       {reduxValue}
  //     </ErrorBoundary>
  //   </div>
  // );

  return (
    <Div>
      <BrowserRouter>
        <div
          css={{
            zIndex: "100",
            position: "sticky",
            top: "20px",
            left: "1rem",
            width: "2rem",
          }}
        >
          <SideBarMemoized />
        </div>
        <div>
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path={["/discover", "/discover/:q"]}
                exact
                component={Serach}
                key={"1"}
              />
              <AnimatePresence exitBeforeEnter>
                <Route path="/games/:id" exact component={Game} key={"3"} />
              </AnimatePresence>
              <Route path="*" component={ErrorPage} />
            </Switch>
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </Div>
  );
};

export default App;
