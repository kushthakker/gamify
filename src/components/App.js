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
import Results from "../pages/Results";
import ErrorPage from "../pages/Error";
import { AnimatePresence } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

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

  function ErrorFallback({ error }) {
    const history = useHistory();
    return (
      <div
        role="alert"
        css={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          margin: "0",
        }}
      >
        <div css={{ marginBottom: "1rem" }}>
          <p css={{ textAlign: "center", fontSize: "2rem" }}>
            Something went wrong:
          </p>
          <pre>{error.message}</pre>
        </div>
        <div>
          <Button onClick={() => history.replace("/")}>Try again</Button>
        </div>
      </div>
    );
  }

  //serach page normal

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <BrowserRouter>
          <SideBarMemoized />
          <div css={{ height: "100vh", width: "100vw" }}>
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/discover/:q"
                  exact
                  component={Results}
                  key={"1"}
                />

                <Route path="/games/:id" exact component={Game} key={"3"} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </AnimatePresence>
          </div>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App;
