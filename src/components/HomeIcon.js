import React from "react";
import { Link } from "react-router-dom";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";

const Position = styled.div({
  position: "fixed",
  top: "2rem",
  left: "2rem",
  fontFamily: "Staatliches",
  fontSize: "2rem",
  letterSpacing: "0.5rem",
  zIndex: "99",
});

const HomeIcon = ({ color = "white" }) => {
  return (
    <Position>
      <Link to="/">
        <div>
          <span css={{ color: color }}>Gamify</span>
        </div>
      </Link>
    </Position>
  );
};

export default HomeIcon;
