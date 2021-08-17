import React, { useCallback } from "react";
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

const Div = styled.div`
  /* minheight: 100vh; */
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-auto-rows: 3.5rem 1fr;
  justify-content: center;
  overscroll-behavior-y: none;
  overflow-y: "hidden";
  grid-template-areas:
    "sidebar Header"
    "sidebar main";
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
            gridArea: "Header",
            position: "sticky",
            top: "0",
            width: "100%",
            boxShadow:
              "0 4px 8px 0 (0, 0, 0, 0.2), 0 6px 20px 0 (0, 0, 0, 0.2)",
          }}
        >
          Header
        </div>
        <div>
          <SideBarMemoized css={{ gridArea: "sidebar" }} />
        </div>
        <div css={{ gridArea: "main", padding: "0 2rem 0 2rem" }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/discover" exact component={Serach} />
            <Route path="/game/:id" exact component={Game} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Div>
  );
};

export default App;
