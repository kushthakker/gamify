import React, { useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt";
import { Spinner, Box, Text, Image } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../api/api";
import { Link } from "react-router-dom";
import { homepageData_carousel } from "../actions/index";
import { homepageData_comingsoon } from "../actions/index";
import { homepageData_featured } from "../actions/index";
import { timer } from "../actions/index";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

const Heading = styled.h1({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginTop: "1rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.5rem",
});

const Recommendedcarousel = ({ carousel }) => {
  return (
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
  );
};

const ComingSoon = ({ comingSoon }) => {
  return (
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
  );
};

const Featured = ({ featured }) => {
  return (
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
              w="70%"
              h="700px"
              m="4rem auto 2rem auto"
              d="flex"
              justifySelf="center"
              boxShadow="rgba(255,215,0, 0.4) 5px 5px, rgba(255,215,0, 0.3) 10px 10px, rgba(255,215,0, 0.2) 15px 15px, rgba(255,215,0, 0.1) 20px 20px, rgba(255,215,0, 0.05) 25px 25px"
            />
          </div>
        </Link>
      </Box>
    </div>
  );
};

const Home = ({ match }) => {
  const [status, setStatus] = useState("idle");
  // const [carousel, setCarousel] = useState(null);
  // const [comingSoon, setComingSoon] = useState(null);
  // const [featured, setFeatured] = useState(null);
  console.log(match);

  const dispatch = useDispatch();

  const homepageData = useSelector((state) => state.homepageData);
  console.log(
    "🚀 ~ file: Home.js ~ line 174 ~ Home ~ homepageData",
    homepageData
  );

  const carousel = useSelector((state) => state.homepageData.carousel);
  const comingSoon = useSelector((state) => state.homepageData.comingSoon);
  const featured = useSelector((state) => state.homepageData.featured);
  const timerState = useSelector((state) => state.timer);

  dayjs.extend(relativeTime);

  console.log(dayjs(timerState).fromNow() === "3 minutes ago");

  const Main = () => {
    return (
      <div>
        <Box p="5rem" ml="2.8rem">
          <Heading>Recommended</Heading>
        </Box>
        <Recommendedcarousel carousel={carousel} />
        <ComingSoon comingSoon={comingSoon} />
        <Featured featured={featured} />
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

          if (!req.status) {
            setStatus("error");
            throw new Error(req.statusText);
          } else {
            console.log(`render main api`);
            // setCarousel(req.data.results);
            // setComingSoon(comingSoon.data.results);
            // setFeatured(featured.data);
            dispatch(homepageData_carousel(req.data.results));
            dispatch(homepageData_comingsoon(comingSoon.data.results));
            dispatch(homepageData_featured(featured.data));
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

  Prompt("Press control + S to open Side Menu from any page", "prompt");

  return status === "success" ? (
    <div css={{ overflow: "auto" }}>
      <SearchBar match={match} />
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

export default Home;
