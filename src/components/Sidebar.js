import React, { useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Magic } from "magic-sdk";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { findAllByTestId } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

const Div = styled.div({
  display: "grid",
  rowGap: "2rem",
  gridAutoFlow: "rows",
  gridAutoRows: "auto",
  overflowY: "hidden",
  justifyContent: "center",
  alignItems: "center",
  // position: "sticky",
  // top: "50px",
  // backgroundColor: "#171d28",
  // height: "100vh",
  // boxShadow: "0 4px 8px 0 black, 0 6px 20px 0 black",
  // color: "white",
  // marginRight: "1rem"
  // borderRadius: "1rem",
  // marginLeft: "1rem",
});

const H1 = styled.h1({
  fontSize: "1.4rem",
  fontWeight: "bold",
});

function ToogleMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button size="sm" onClick={toggleColorMode} css={{ width: "auto" }}>
        {colorMode === "light" ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </Button>
    </header>
  );
}

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let isOpenForKey = false;

  const keyDownFnc = (e) => {
    if (e.key === "s" && e.ctrlKey) {
      e.preventDefault();

      if (isOpenForKey === false) {
        onOpen();
        return (isOpenForKey = true);
      } else {
        onClose();
        return (isOpenForKey = false);
      }
    }
  };

  useEffect(() => {
    console.log(isOpen);
    document.documentElement.addEventListener("keydown", keyDownFnc);
    return () => {
      document.documentElement.removeEventListener("keydown", keyDownFnc);
    };
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="facebook"
        css={{
          zIndex: "99",
          maxWidth: "3rem",
          position: "fixed",
          top: "2rem",
          left: "2rem",
        }}
      >
        <i className="fas fa-bars"></i>
      </Button>
      <Drawer
        placement={"left"}
        onClose={onClose}
        isOpen={isOpen}
        closeOnEsc={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" d="flex">
            <ToogleMode />
            <div css={{ position: "relative", left: "4.5rem", width: "100%" }}>
              Gamify
            </div>
            <DrawerCloseButton height="3rem" width="3rem" verticalAlign />
          </DrawerHeader>
          <DrawerBody>
            <Div>
              <Link to={"/"}>
                <H1 onClick={onClose}>Home</H1>
              </Link>
              <Link to={"/dashboard"}>
                <H1 onClick={onClose}>Dashboard</H1>
              </Link>
              {/* <Link to={"/discover"}>
                <H1 onClick={onClose}>Search</H1>
              </Link> */}
              {/* <div>
                <H1 onClick={() => onClick()}>Login</H1>
                <h3 onClick={() => m.user.logout()}>Logout</h3>
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
              </div> */}
              {/* <div>
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
              </div> */}
            </Div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SideBarMemoized = React.memo(Sidebar);

export default SideBarMemoized;
