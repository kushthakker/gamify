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
  MenuDivider,
  SkeletonCircle,
  Kbd,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { isLoggedIn } from "../actions/index";
import { userId } from "../actions/index";
import { email } from "../actions/index";
import _ from "lodash";

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

  const data = useSelector((state) => state.profileDataApi.data);

  const dispatch = useDispatch();
  const LogoutFnc = (e) => {
    if (e.key === "j" && e.ctrlKey) {
      e.preventDefault();
      logout(dispatch);
    }
  };
  const DashboardFnc = (e) => {
    if (e.key === "b" && e.ctrlKey) {
      e.preventDefault();
      history.push("/dashboard");
    }
  };
  const ModeFnc = (e) => {
    if (e.key === "m" && e.ctrlKey) {
      e.preventDefault();
      toggleColorMode();
    }
  };

  useEffect(() => {
    document.documentElement.addEventListener("keydown", LogoutFnc);
    document.documentElement.addEventListener("keydown", DashboardFnc);
    document.documentElement.addEventListener("keydown", ModeFnc);
    return () => {
      document.documentElement.removeEventListener("keydown", LogoutFnc);
      document.documentElement.removeEventListener("keydown", DashboardFnc);
      document.documentElement.removeEventListener("keydown", ModeFnc);
    };
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div
      css={{
        zIndex: "99",
        maxWidth: "3rem",
        position: "fixed",
        top: "2rem",
        right: isLoggedIn === true ? "12rem" : "6rem",
      }}
    >
      {isLoggedIn === true && data !== undefined ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<i className="fas fa-chevron-down"></i>}
            leftIcon={
              <Image src={data.picture} w="35px" h="35px" borderRadius="35px" />
            }
            variant="ghost"
            colorScheme="teal"
            width="210px"
          >
            {data.name}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => history.push("/dashboard")}
              icon={<i className="fas fa-users-cog"></i>}
              command={
                <span>
                  <Kbd>ctrl</Kbd> + <Kbd>K</Kbd>
                </span>
              }
            >
              Dashboard
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={toggleColorMode}
              icon={
                colorMode === "light" ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )
              }
              command={
                <span>
                  <Kbd>ctrl</Kbd> + <Kbd>M</Kbd>
                </span>
              }
            >
              {colorMode === "light" ? (
                <span>Dark Mode</span>
              ) : (
                <span>Light Mode</span>
              )}
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => logout(dispatch)}
              icon={<i className="fas fa-sign-out-alt"></i>}
              command={
                <span>
                  <Kbd>ctrl</Kbd> + <Kbd>J</Kbd>
                </span>
              }
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : isLoggedIn === false ? (
        <Link to={"/login"}>
          <Button colorScheme="teal" variant="outline" w="6rem">
            Login
          </Button>
        </Link>
      ) : (
        <div>
          <SkeletonCircle size="10" />
        </div>
      )}
    </div>
  );
};

export default React.memo(LoginButton);
