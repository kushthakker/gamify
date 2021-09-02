import React, { useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt";
import { Spinner, Box, Text, Image, Badge } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../api/api";
import { Link } from "react-router-dom";
import { homepageData_carousel } from "../actions/index";
import { homepageData_comingsoon } from "../actions/index";
import { homepageData_featured } from "../actions/index";
import { homepageData_publisher_microsoft } from "../actions/index";
import { homepageData_publisher_sony } from "../actions/index";
import { homepageData_publisher_nintendo } from "../actions/index";
import { timer } from "../actions/index";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import LoginButton from "../components/LoginButton";
import SideBarMemoized from "../components/Sidebar";
import HomeIcon from "../components/HomeIcon";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

const Heading = styled.h1({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginTop: "1rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.5rem",
});
const MiniHeading = styled.h1({
  fontSize: "1.7rem",
  fontWeight: "bold",
  marginTop: "1rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.5rem",
  margin: "5rem auto 2rem auto",
  textAlign: "center",
});

const Recommendedcarousel = ({ carousel }) => {
  return (
    <FadeInWhenVisible>
      <Box p="5rem" ml="2.8rem">
        <Heading css={{ marginLeft: "2.8rem" }}>Recommended</Heading>
      </Box>
      <Carousel
        showArrows={true}
        infiniteLoop="true"
        useKeyboardArrows="true"
        autoPlay={true}
        stopOnHover={false}
        showThumbs={false}
        showStatus={false}
        width="1200px"
        css={{
          width: "1200px",

          margin: "0 auto 2rem auto",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        {carousel.map((game, index) => {
          return (
            <Link to={`/games/${game.id}`} key={index}>
              <div>
                <img
                  src={game.background_image}
                  alt="img"
                  css={{
                    width: "1200px",
                    height: "600px",
                    borderRadius: "0.5rem",
                    position: "relative",
                  }}
                />
                <p
                  // className="legend"
                  css={{
                    position: "absolute",
                    bottom: "2rem",
                    backgroundColor: "white",
                    opacity: "0.7",
                    color: "black",
                    width: "40%",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontFamily: "Staatliches",
                  }}
                >
                  {game.name}
                </p>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </FadeInWhenVisible>
  );
};

const ComingSoon = ({ comingSoon }) => {
  return (
    <FadeInWhenVisible>
      <div>
        <Box p="5rem" ml="2.8rem">
          <Heading>Coming soon</Heading>
        </Box>
        <Box mt="2rem">
          {comingSoon.map((game, index) => {
            return (
              <Link to={`/games/${game.id}`} key={index}>
                <Box
                  // w="100%"
                  h="12rem"
                  bgImage={game.background_image}
                  opacity="0.7"
                  backgroundPosition=" 35% 35%"
                  backgroundSize="cover"
                >
                  <Text
                    fontSize="2rem"
                    fontFamily="Staatliches"
                    color="black"
                    bg="white"
                    w="fit-content"
                    // opacity="0.7"
                    pos="relative"
                    top="7rem"
                    p="0.2rem"
                  >
                    {game.name}
                  </Text>
                </Box>
              </Link>
            );
          })}
        </Box>
      </div>
    </FadeInWhenVisible>
  );
};

const Featured = ({ featured }) => {
  return (
    <FadeInWhenVisible>
      <div>
        <Box p="5rem" ml="2.8rem">
          <Heading>Featured</Heading>
        </Box>
        <Box mt="2rem">
          <Link to={`/games/${featured.id}`}>
            <h2
              css={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginTop: "2rem",
                fontFamily: "Rampart One",
                letterSpacing: "0.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {featured.name}
            </h2>
            <div css={{ width: "100vw" }}>
              <Image
                src={featured.background_image}
                w="60%"
                h="600px"
                m="4rem auto 2rem auto"
                d="flex"
                justifySelf="center"
                boxShadow="rgba(255,215,0, 0.4) 5px 5px, rgba(255,215,0, 0.3) 10px 10px, rgba(255,215,0, 0.2) 15px 15px, rgba(255,215,0, 0.1) 20px 20px, rgba(255,215,0, 0.05) 25px 25px"
              />
            </div>
          </Link>
        </Box>
      </div>
    </FadeInWhenVisible>
  );
};

const Publishers = ({ microsoft, sony, nintendo }) => {
  return (
    <div css={{ marginTop: "8rem" }}>
      <Heading css={{ marginLeft: "2.8em" }}>Publishers</Heading>
      <div>
        <Box mt="3rem">
          <MiniHeading>Microsoft</MiniHeading>
          <div>
            <Marquee
              // pauseOnHover="true"
              speed="80"
              gradient="false"
              gradientWidth="0"
            >
              {microsoft.map((ele) => {
                return (
                  <Link to={`/games/${ele.id}`} key={Math.random()}>
                    <div css={{ marginRight: "3rem" }}>
                      <Box
                        w="27rem"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={ele.background_image}
                          alt={ele.name}
                          h="241px"
                          w="100%"
                        />

                        <Box p="6">
                          <Box d="flex" alignItems="baseline">
                            {/* <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              series
                            </Badge> */}
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {ele.released}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {ele.name}
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Link>
                );
              })}
            </Marquee>
          </div>
        </Box>
      </div>
      <div>
        <Box mt="3rem">
          <MiniHeading>Sony</MiniHeading>
          <div>
            <Marquee
              // pauseOnHover="true"
              speed="80"
              gradient="false"
              gradientWidth="0"
            >
              {sony.map((ele) => {
                return (
                  <Link to={`/games/${ele.id}`} key={Math.random()}>
                    <div css={{ marginRight: "3rem" }}>
                      <Box
                        w="27rem"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={ele.background_image}
                          alt={ele.name}
                          h="241px"
                          w="100%"
                        />

                        <Box p="6">
                          <Box d="flex" alignItems="baseline">
                            {/* <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              series
                            </Badge> */}
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {ele.released}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {ele.name}
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Link>
                );
              })}
            </Marquee>
          </div>
        </Box>
      </div>
      <div>
        <Box mt="3rem">
          <MiniHeading>Nintendo</MiniHeading>
          <div>
            <Marquee
              // pauseOnHover="true"
              speed="80"
              gradient="false"
              gradientWidth="0"
            >
              {nintendo.map((ele) => {
                return (
                  <Link to={`/games/${ele.id}`} key={Math.random()}>
                    <div css={{ marginRight: "3rem" }}>
                      <Box
                        w="27rem"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={ele.background_image}
                          alt={ele.name}
                          h="241px"
                          w="100%"
                        />

                        <Box p="6">
                          <Box d="flex" alignItems="baseline">
                            {/* <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              series
                            </Badge> */}
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {ele.released}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {ele.name}
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Link>
                );
              })}
            </Marquee>
          </div>
        </Box>
      </div>
    </div>
  );
};

const Home = ({ match }) => {
  const [status, setStatus] = useState("idle");
  // const [carousel, setCarousel] = useState(null);
  // const [comingSoon, setComingSoon] = useState(null);
  // const [featured, setFeatured] = useState(null);
  // console.log(match);

  const dispatch = useDispatch();

  // const homepageData = useSelector((state) => state.homepageData);
  // console.log(
  //   "🚀 ~ file: Home.js ~ line 174 ~ Home ~ homepageData",
  //   homepageData
  // );

  const carousel = useSelector((state) => state.homepageData.carousel);
  const comingSoon = useSelector((state) => state.homepageData.comingSoon);
  const featured = useSelector((state) => state.homepageData.featured);
  const timerState = useSelector((state) => state.timer);
  const microsoft = useSelector(
    (state) => state.homepageData.publishers.microsoft
  );
  const sony = useSelector((state) => state.homepageData.publishers.sony);
  const nintendo = useSelector(
    (state) => state.homepageData.publishers.nintendo
  );

  dayjs.extend(relativeTime);

  const Main = () => {
    return (
      <div>
        <Recommendedcarousel carousel={carousel} />
        <ComingSoon comingSoon={comingSoon} />
        <Featured featured={featured} />
        <Publishers microsoft={microsoft} sony={sony} nintendo={nintendo} />
      </div>
    );
  };

  React.useEffect(() => {
    if (timerState === null || dayjs(timerState).fromNow() === "an hour ago") {
      const fetchApi = async function () {
        try {
          const req = await api.get("/games", {
            params: {
              metacritic: "90,100",
              ordering: "-released",
              page_size: 5,
            },
          });
          const comingSoon = await api.get("/games", {
            params: {
              ordering: "released",
              page_size: 5,
            },
          });
          const gameId = "257192";
          const featured = await api.get(`/games/${gameId}`, {
            params: {
              id: gameId,
              // search_precise: true,
            },
          });
          const Microsoft = await api.get("/games", {
            params: {
              publishers: "microsoft-studios",
              page_size: 10,
              ordering: "-released",
              metacritic: "80,100",
            },
          });
          const Sony = await api.get("/games", {
            params: {
              publishers: "sony-interactive-entertainment",
              page_size: 10,
              ordering: "-released",
              metacritic: "80,100",
            },
          });
          const Nintendo = await api.get("/games", {
            params: {
              publishers: "nintendo",
              page_size: 10,
              ordering: "-released",
              metacritic: "80,100",
            },
          });

          if (!req.status) {
            setStatus("error");
            throw new Error(req.statusText);
          } else {
            console.log(`render main api`);
            dispatch(homepageData_carousel(req.data.results));
            dispatch(homepageData_comingsoon(comingSoon.data.results));
            dispatch(homepageData_featured(featured.data));
            dispatch(homepageData_publisher_microsoft(Microsoft.data.results));
            dispatch(homepageData_publisher_sony(Sony.data.results));
            dispatch(homepageData_publisher_nintendo(Nintendo.data.results));
            dispatch(timer(dayjs().format()));
            setStatus("success");
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchApi();
    } else {
      setStatus("success");
    }
  }, [dispatch, timerState]);

  Prompt("Press control + K to search a game from anywhere", "prompt");

  return status === "success" ? (
    <div css={{ overflow: "auto" }}>
      {/* <SideBarMemoized /> */}
      <HomeIcon />
      <SearchBar match={match} />
      <LoginButton />
      <Main />
    </div>
  ) : (
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
  );
};

export default React.memo(Home);
