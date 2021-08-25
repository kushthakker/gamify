import React, { useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const m = new Magic("pk_live_8BB9335EFCCF939E", {
  extensions: [new OAuthExtension()],
}); // ✨

const LoginButton = () => {
  const history = useHistory();
  const [user, setUser] = React.useState(null);

  //   React.useState(() => {
  //     const login = async function () {
  //       try {
  //         if (await m.user.isLoggedIn()) {
  //           const didToken = await m.user.getIdToken();
  //           const user = await m.user.getMetadata();
  //           // Do something with the DID token.
  //           // For instance, this could be a `fetch` call
  //           // to a protected backend endpoint.
  //           console.log(didToken);
  //           console.log(user);
  //           console.log(`is logged in`);
  //         } else {
  //           // const user = await m.auth.loginWithMagicLink(
  //           //   "codingpurposebykush@gmail.com"
  //           // );
  //           console.log("not logged in");
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     login();
  //   });

  const onClick = async () => {
    try {
      await m.auth.loginWithMagicLink({
        email: "codingpurposebykush@gmail.com",
        showUI: true,
        redirectURI: `${window.location.origin}/`,
      });
      const idToken = await m.user.getIdToken();
      const { issuer, email, publicAddress } = await m.user.getMetadata();
      console.log(idToken);
      console.log(issuer);
      console.log(email);
      console.log(publicAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoogle = async () => {
    try {
      await m.oauth.loginWithRedirect({
        provider: "google" /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `${window.location.origin}/callback`,

        // scope: ["user:email"] /* optional */,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useState(() => {
    const render = async () => {
      if (window.location.pathname === "/callback") {
        try {
          const result = await m.oauth.getRedirectResult();
          const profile = JSON.stringify(result.oauth.userInfo, undefined, 2);
          const idToken = await m.user.getIdToken();
          const metadata = await m.user.getMetadata();
          const isLogin = await m.user.isLoggedIn();
          console.log(profile);
          console.log(idToken);
          console.log(metadata);
          console.log(isLogin);

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
          console.log(`is logged in`);
        } else {
          const user = await m.auth.loginWithMagicLink();
          console.log("not logged in");
        }
      } catch (err) {
        console.log(err);
      }
    };
    login();
  });

  const onClickGithub = async (e) => {
    e.preventDefault();
    try {
      await m.oauth.loginWithRedirect({
        provider: "github" /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `${window.location.origin}/callback`,
        // scope: ["user:email"] /* optional */,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      css={{
        zIndex: "99",
        maxWidth: "3rem",
        position: "fixed",
        top: "2rem",
        right: "4rem",
      }}
    >
      <Button onClick={onClickGoogle} colorScheme="teal" variant="outline">
        Login
      </Button>
    </div>
  );
};

export default React.memo(LoginButton);
