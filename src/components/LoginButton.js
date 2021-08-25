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
import { isLoggedIn } from "../actions/index";
import { userId } from "../actions/index";
import { email } from "../actions/index";

const m = new Magic("pk_live_8BB9335EFCCF939E", {
  extensions: [new OAuthExtension()],
}); // ✨

const logout = async function (dispatch) {
  try {
    await m.user.logout();
    dispatch(isLoggedIn(false));
    dispatch(userId(null));
    dispatch(email(null));
  } catch (err) {
    console.log(err);
  }
};

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
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
      {isLoggedIn === true ? (
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => logout(dispatch)}
        >
          Logout
        </Button>
      ) : (
        <Link to={"/login"}>
          <Button colorScheme="teal" variant="outline">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default React.memo(LoginButton);
