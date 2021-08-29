import React, { useEffect, useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Grid,
} from "@chakra-ui/react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import SideBarMemoized from "../components/Sidebar";
import { isLoggedIn } from "../actions/index";

const m = new Magic("pk_live_8BB9335EFCCF939E", {
  extensions: [new OAuthExtension()],
}); // ✨

const Heading = styled.h1({
  position: "relative",
  left: "10rem",
  fontSize: "6rem",
  fontFamily: "Staatliches",
});

const LoginPage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();

  const [emailData, setEmailData] = useState(null);

  const onClick = async () => {
    try {
      await m.auth.loginWithMagicLink({
        email: `${emailData}`,
        showUI: true,
        // redirectURI: `${window.location.origin}/`,
      });
      history.push("/success");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoogle = async () => {
    try {
      await m.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/success`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGithub = async () => {
    try {
      await m.oauth.loginWithRedirect({
        provider: "github",
        redirectURI: `${window.location.origin}/success`,
        // scope: ["user:email"] /* optional */,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>
      {/* {isLoggedIn ? (
        history.push("/")
      ) : ( */}
      <div css={{ maxHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}>
        <SideBarMemoized />

        <Box maxW="100vw" maxH="100vh">
          <Heading>Login</Heading>
          <Box
            // p="5rem"
            display="grid"
            justifyContent="center"
            // alignItems="center"
            borderWidth="2px"
            borderRadius="lg"
            borderColor="gray"
            gridtemplaterows="250px 2fr"
            w="35rem"
            h="35rem"
            m="4rem auto 0 auto"
          >
            <div
              css={{
                width: "34.8rem",
                height: "15rem",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#9999ff",
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
                Gamify
              </h1>
            </div>
            <div
              css={{
                width: "34.8rem",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  //async calls here
                  console.log(String(data.email));
                  setEmailData(String(data.email));
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field name="email" type="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email" pos="relative" top="-1rem">
                            Email
                          </FormLabel>
                          <Input
                            {...field}
                            id="email"
                            placeholder="Email"
                            w="20rem"
                            mb="5rem"
                            pos="relative"
                            autoComplete="off"
                            // top="-1rem"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      mt={4}
                      colorScheme="teal"
                      pos="relative"
                      top="-5rem"
                      onClick={onClick}
                    >
                      Login Without Password
                    </Button>
                    <Grid
                      templateColumns="1fr 1fr"
                      justify="center"
                      gap="4rem"
                      pos="relative"
                      bottom="2rem"
                    >
                      <Button
                        colorScheme="linkedin"
                        rightIcon={<i className="fab fa-github"></i>}
                        onClick={onClickGithub}
                      >
                        Github
                      </Button>
                      <Button
                        as="button"
                        colorScheme="red"
                        rightIcon={<i className="fab fa-google"></i>}
                        onClick={onClickGoogle}
                      >
                        Google
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Box>
        </Box>
      </div>
      {/* )} */}
    </div>
  );
};

export default React.memo(LoginPage);
