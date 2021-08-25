import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import SideBarMemoized from "../components/Sidebar";

const ErrorPage = () => {
  return (
    <div>
      <SideBarMemoized />
      Success...
    </div>
  );
};

export default ErrorPage;
