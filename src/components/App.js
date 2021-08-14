import React, { useCallback } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { error } from "../actions";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
const Button = styled.button({
  background: "red",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid black",
  fontSize: "20px",
});

const MyIncrementButton = React.memo(({ onIncrement }) => {
  return <Button onClick={onIncrement}>Increment</Button>;
});

const App = () => {
  const dispatch = useDispatch();

  const Increment = useCallback(() => dispatch(error()), [dispatch]);

  const reduxValue = useSelector((state) => state.error);

  return (
    <div>
      <ErrorBoundary fallBackComponent={ErrorFallback}>
        <div
          css={{
            color: "red",
            fontSize: "20px",
            margin: "30px",
          }}
        >
          BoilerPlate
        </div>
        <MyIncrementButton onIncrement={Increment} />
        {reduxValue}
      </ErrorBoundary>
    </div>
  );
};

export default App;
