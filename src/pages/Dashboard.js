import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector } from "react-redux";
import SideBarMemoized from "../components/Sidebar";
import LoginButton from "../components/LoginButton";
import {
  Spinner,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Main = () => {
  return (
    <div
      css={{
        width: "100vw",
        maxHeight: "100vh",
        display: "grid",
        gridTemplateRows: "350px 1fr",
      }}
    >
      <div
        css={{
          backgroundColor: "#9999ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          css={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Pacifico",
            letterSpacing: "0.5rem",
            color: "black",
          }}
        >
          Dashboard
        </h1>
      </div>
      <div css={{ padding: "4rem" }}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>My games</Tab>
            <Tab>Wishlist</Tab>
            <Tab>Collection</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>My games</p>
            </TabPanel>
            <TabPanel>
              <p>Wishlist</p>
            </TabPanel>
            <TabPanel>
              <p>Collection</p>
            </TabPanel>
            <TabPanel>
              <p>Settings</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
const Heading = styled.h1({
  fontSize: "3rem",
  fontFamily: "Staatliches",
});

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const history = useHistory();

  return (
    <div>
      {isLoggedIn === {} ? (
        <div
          css={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0",
          }}
        >
          <Spinner />
        </div>
      ) : isLoggedIn === false ? (
        <div
          css={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "column",
          }}
        >
          <SideBarMemoized />
          <Heading>Please login to view this page </Heading>
          <Button
            colorScheme="white"
            variant="outline"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
          <SideBarMemoized />
          <LoginButton />
          <Main />
        </div>
      )}
    </div>
  );
};

export default React.memo(Dashboard);

//TODO: add a rest api server and host it on heroku. Store all users in it with id as the identifier and in that id store the user didToken, name, avatar and user's data like their wishlist, collection, etc.
//TODO: A option to show merge both accounts in the user dashboard if we have different mails in same userid/didId.
