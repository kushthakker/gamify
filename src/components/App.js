import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return (
    <div>
      <ErrorBoundary
        fallBackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <div>BoilerPlate</div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
