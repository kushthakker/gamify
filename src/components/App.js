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
import { profileData } from "../actions/index";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

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
  // const [profileDataState, setProfileDataState] = useState({});

  useState(() => {
    const m = new Magic("pk_live_8BB9335EFCCF939E", {
      extensions: [new OAuthExtension()],
    }); // ✨
    const login = async function () {
      try {
        if (await m.user.isLoggedIn()) {
          const didToken = await m.user.getIdToken();
          const user = await m.user.getMetadata();
          // Do something with the DID token.
          // For instance, this could be a `fetch` call
          // to a protected backend endpoint.
          console.log(didToken);
          console.log(user);

          dispatch(isLoggedIn(await m.user.isLoggedIn()));
          dispatch(userId(didToken));
          dispatch(email(user.email));
        } else {
          await m.auth.loginWithMagicLink();
          console.log("not logged in");
          dispatch(isLoggedIn(await m.user.isLoggedIn()));
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
          const profile = await JSON.stringify(
            result.oauth.userInfo,
            undefined,
            2
          );
          const idToken = await m.user.getIdToken();
          const metadata = await m.user.getMetadata();
          const isLogin = await m.user.isLoggedIn();
          console.log(profile);
          console.log(idToken);
          console.log(metadata);
          console.log(isLogin);
          dispatch(isLoggedIn(isLogin));
          dispatch(userId(idToken));
          dispatch(email(metadata.email));
          dispatch(profileData(profile));

          //   console.log(m.user.m.user.generateIdToken());
          //   console.log(m.user.isLoggedIn());
        } catch {
          window.location.href = window.location.origin;
        }
      } else {
        console.log("pls try again");
      }
    };
    render();
  });

  //serach page normal

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <BrowserRouter>
          <div css={{ height: "100vh", width: "100vw" }}>
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route path="/" exact component={Home} key={1} />
                <Route path="/discover/:q" exact component={Results} key={2} />

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
                <Route path="*" component={ErrorPage} />
              </Switch>
            </AnimatePresence>
          </div>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App;
