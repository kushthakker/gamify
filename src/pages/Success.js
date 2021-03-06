import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Heading = styled.h1({
  fontSize: "4rem",
  fontFamily: "Staatliches",
});

const Success = () => {
  const path = useSelector((state) => state.lastLoginUrlQuery);
  const prompt = localStorage.getItem("lastLoginUrlQuery");
  const [redirect, setRedirect] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(7);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 7000);
    const countdown = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0)
      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
  }, [timeLeft]);

  function timeComplete() {
    window.location.href = prompt;
    // localStorage.removeItem("lastLoginUrlQuery");
  }

  // /* (window.location.href = "/") */
  console.log(`path`, path);
  return (
    <div>
      {redirect && timeLeft === 1 ? (
        timeComplete()
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
          <Heading>Redirecting in {timeLeft}</Heading>
        </div>
      )}
    </div>
  );
};

export default Success;
