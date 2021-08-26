import React, { useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
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
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const profileData = useSelector((state) => state.user.profileData);
  const dispatch = useDispatch();
  console.log(profileData);
  return (
    <div
      css={{
        zIndex: "99",
        maxWidth: "3rem",
        position: "fixed",
        top: "2rem",
        right: "8rem",
      }}
    >
      {isLoggedIn === true ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<i className="fas fa-chevron-down"></i>}
            variant="outline"
            colorScheme="teal"
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => history.push("/dashboard")}
              icon={<i className="fas fa-users-cog"></i>}
              command="⌘B"
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => logout(dispatch)}
              icon={<i className="fas fa-sign-out-alt"></i>}
              command="⌘J"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link to={"/login"}>
          <Button colorScheme="teal" variant="outline" w="6rem">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
