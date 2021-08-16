import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Div = styled.div({
  display: "grid",
  rowGap: "2rem",
  gridAutoFlow: "rows",
  gridAutoRows: "auto",
  overflowY: "hidden",
  justifyContent: "center",
  alignItems: "center",
  position: "sticky",
  top: "50px",
});

const H1 = styled.h1({
  fontSize: "1.4rem",
  fontWeight: "bold",
});

function ToogleMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}

const Sidebar = () => {
  return (
    <Div>
      <ToogleMode />
      <Link to={"/"}>
        <H1>Gamify</H1>
      </Link>
      <Link to={"/discover"}>
        <H1>Search</H1>
      </Link>
      <div>
        <H1>Profile Name</H1>
        <h3>Wishlist</h3>
        <h3>library</h3>
      </div>
      <div>
        <H1>New Releases</H1>
        <div>
          <h3>Last 30 days</h3>
          <h3>This week</h3>
          <h3>Coming next week</h3>
        </div>
      </div>
      <div>
        <H1>Top</H1>
        <div>
          <h3>Best of year</h3>
          <h3>Popular in 2021</h3>
          <h3>All time top 250</h3>
        </div>
      </div>
      <div>
        <H1>Platforms</H1>
        <div>
          <h3>PC</h3>
          <h3>Xbox</h3>
          <h3>Playstation</h3>
        </div>
      </div>
      <div>
        <H1>All Games</H1>
      </div>
    </Div>
  );
};

const SideBarMemoized = React.memo(Sidebar);

export default SideBarMemoized;
