import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt";

const Home = ({ match }) => {
  console.log(match);
  Prompt("Press control/alt + S to open Side Menu from any page", "prompt");
  return <div>Home</div>;
};

export default Home;
