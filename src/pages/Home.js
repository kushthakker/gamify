import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt";
import SearchBar from "../components/SearchBar";

const Home = ({ match }) => {
  console.log(match);
  Prompt("Press control + S to open Side Menu from any page", "prompt");
  return (
    <div>
      <SearchBar match={match} />
    </div>
  );
};

export default Home;
