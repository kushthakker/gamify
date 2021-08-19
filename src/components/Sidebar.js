import React, { useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Magic } from "magic-sdk";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { findAllByTestId } from "@testing-library/react";

const m = new Magic("pk_live_8BB9335EFCCF939E"); // ✨

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
      <Button
        size="sm"
        onClick={toggleColorMode}
        css={{ zIndex: 100, width: "auto" }}
      >
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  React.useState(() => {
    const login = async function () {
      try {
        if (await m.user.isLoggedIn()) {
          const didToken = await m.user.getIdToken();

          // Do something with the DID token.
          // For instance, this could be a `fetch` call
          // to a protected backend endpoint.
          console.log(didToken);
          console.log(`is logged in`);
        } else {
          const user = await m.auth.loginWithMagicLink(
            "codingpurposebykush@gmail.com"
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    login();
  });

  const onClick = async () => {
    try {
      await m.auth.loginWithMagicLink({
        email: "codingpurposebykush@gmail.com",
        showUI: true,
        redirectURI: "http://localhost:3000/",
      });
      const idToken = await m.user.getIdToken();
      const { issuer, email, publicAddress } = await m.user.getMetadata();
      console.log(idToken, issuer, email, publicAddress);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button colorScheme="blue" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        placement={"left"}
        onClose={onClose}
        isOpen={isOpen}
        closeOnEsc={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Gamify</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Div>
              <ToogleMode />
              <Link to={"/"}>
                <H1 onClick={onClose}>Gamify</H1>
              </Link>
              <Link to={"/discover"}>
                <H1 onClick={onClose}>Search</H1>
              </Link>
              <div>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SideBarMemoized = React.memo(Sidebar);

export default SideBarMemoized;
