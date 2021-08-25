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
import { Link, useHistory } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import SideBarMemoized from "../components/Sidebar";

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
  //   const history = useHistory();

  const [emailData, setEmailData] = useState(null);
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
  });

  const onClick = async () => {
    try {
      await m.auth.loginWithMagicLink({
        email: `${emailData}`,
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
        provider: "google",
        redirectURI: `${window.location.origin}/callback`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGithub = async () => {
    try {
      await m.oauth.loginWithRedirect({
        provider: "github",
        redirectURI: `${window.location.origin}/callback`,
        // scope: ["user:email"] /* optional */,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().required(),
  });

  return (
    <div>
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
                console.log(`submit: `, data);
                setEmailData(data.email);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* this 👆 (<Form>)is equal to => <from onSubmit={handleSubmit}> */}
                  <Field name="email">
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
                          // top="-1rem"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
  );
};

export default React.memo(LoginPage);
