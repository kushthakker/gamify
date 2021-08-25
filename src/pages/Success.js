import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";

const Heading = styled.h1({
  fontSize: "6rem",
  fontFamily: "Pacifico",
});

const Success = () => {
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      {redirect ? (
        (window.location.href = "/")
      ) : (
        <div
          css={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <Heading>Redirecting...</Heading>
        </div>
      )}
    </div>
  );
};

export default Success;
