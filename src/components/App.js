import React, { useCallback, useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { error } from "../actions";
import SideBarMemoized from "./Sidebar";
import Success from "../pages/Success";
import HomeIcon from "../components/HomeIcon";
import LoginButton from "../components/LoginButton";

import Game from "../pages/Game";
import Home from "../pages/Home";
import Results from "../pages/Results";
import ErrorPage from "../pages/Error";
import { AnimatePresence } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import LoginPage from "../pages/LoginPage";
import { isLoggedIn } from "../actions/index";
import { userId } from "../actions/index";
import { email } from "../actions/index";
import { addUser } from "../actions/index";
import { fetchUser } from "../actions/index";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import SearchBar from "../components/SearchBar";
import { LastLocationProvider } from "react-router-last-location";
import { isMobile } from "react-device-detect";
import { useColorMode } from "@chakra-ui/react";

function ErrorFallback({ error }) {
  const history = useHistory();

  return (
    <div
      role="alert"
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: "0",
        overflowX: "hidden",
      }}
    >
      <div css={{ marginBottom: "1rem" }}>
        <p css={{ textAlign: "center", fontSize: "2rem" }}>
          Something went wrong:
        </p>
        <pre>{error.message}</pre>
      </div>
      <div>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => history.replace("/")}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  // const [profileDataState, setProfileDataState] = useState({});

  useState(() => {
    colorMode === "light" ? toggleColorMode("dark") : toggleColorMode("light");
    const m = new Magic("pk_live_8BB9335EFCCF939E", {
      extensions: [new OAuthExtension()],
    }); // ???
    const login = async function () {
      try {
        if (await m.user.isLoggedIn()) {
          const didToken = await m.user.getIdToken();
          const metadata = await m.user.getMetadata();
          const publicAddress = metadata.publicAddress;
          // Do something with the DID token.
          // For instance, this could be a `fetch` call
          // to a protected backend endpoint.
          console.log(didToken);
          console.log("metadata", metadata);

          dispatch(isLoggedIn(await m.user.isLoggedIn()));
          dispatch(userId(publicAddress));
          dispatch(email(metadata.email));
          dispatch(fetchUser(publicAddress)) || m.user.logout();
        } else {
          await m.auth.loginWithMagicLink();
          console.log("not logged in");
          dispatch(isLoggedIn(await m.user.isLoggedIn()));
          const metadata = await m.user.getMetadata();
          const publicAddress = metadata.publicAddress;
          dispatch(fetchUser(publicAddress)) || m.user.logout();
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    login();
    const render = async () => {
      if (window.location.pathname === "/success") {
        try {
          const result = await m.oauth.getRedirectResult();
          const profile = JSON.stringify(result.oauth.userInfo, undefined, 2);
          const idToken = await m.user.getIdToken();

          const metadata = await m.user.getMetadata();
          const publicAddress = metadata.publicAddress;
          const isLogin = await m.user.isLoggedIn();
          console.log(profile);
          console.log("metadata", metadata);
          console.log(isLogin);
          dispatch(isLoggedIn(isLogin));
          dispatch(userId(publicAddress));
          dispatch(email(metadata.email));
          const data = {
            id: publicAddress,
            data: { ...JSON.parse(profile) },
            wishlist: [],
            collection: [],
            mygames: {
              uncategorized: [],
              currentPlaying: [],
              finished: [],
              notPlayedYet: [],
            },
          };
          // const getUser = await dispatch(fetchUser(publicAddress));
          // if (getUser === undefined) dispatch(addUser(data));
          dispatch(addUser(data));
        } catch (error) {
          window.location.href = window.location.origin;
          console.log(error);
        }
      } else {
        console.log("please try again");
      }
    };
    render();
  });

  //serach page normal

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {isMobile ? (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "0",
            fontSize: "2rem",
          }}
        >
          This Content is not available on mobile. Please try accessing it from
          your desktop/laptop browser.
        </div>
      ) : (
        <div>
          <BrowserRouter>
            <LastLocationProvider>
              <div css={{ height: "100vh", width: "100vw" }}>
                <Switch>
                  <AnimatePresence exitBeforeEnter>
                    <Route path="/" exact component={Home} key={1} />
                    <Route path="/discover/">
                      <HomeIcon />
                      <SearchBar />
                      <LoginButton />
                      <Route
                        path="/discover/:q"
                        exact
                        component={Results}
                        key={2}
                      />
                    </Route>

                    <Route path="/games/:id" exact component={Game} key={3} />

                    <Route path="/login" exact component={LoginPage} key={4} />
                    <Route
                      exact
                      path="/success"
                      component={Success}
                      key={5}
                      // condition={false}
                    />
                    <Route
                      exact
                      path="/dashboard"
                      component={Dashboard}
                      key={6}

                      // condition={true}
                    />
                  </AnimatePresence>
                  <Route path="*" component={ErrorPage} />
                </Switch>
              </div>
            </LastLocationProvider>
          </BrowserRouter>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
