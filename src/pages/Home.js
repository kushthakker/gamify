import React, { useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt";
import { Spinner, Box, Text } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../api/api";
import { Link } from "react-router-dom";

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
      css={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
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

const Home = ({ match }) => {
  const [status, setStatus] = useState("idle");
  const [carousel, setCarousel] = useState(null);
  const [newGames, setNewGames] = useState(null);
  console.log(match);

  const Heading = styled.h1({
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginTop: "1rem",
    fontFamily: "Staatliches",
    letterSpacing: "0.5rem",
  });

  const Main = () => {
    return (
      <div>
        <Box p="5rem" ml="2.8rem">
          <Heading>Recommended</Heading>
        </Box>
        <Recommendedcarousel carousel={carousel} />
      </div>
    );
  };

  React.useEffect(() => {
    const fetchApi = async function () {
      try {
        const req = await api.get("/games", {
          params: {
            metacritic: "90,100",
            ordering: "-released",
            page_size: 5,
          },
        });
        const newGames = await api.get("/games", {
          params: {
            ordering: "-released",
            page_size: 5,
          },
        });

        if (!req.status) {
          setStatus("error");
          throw new Error(req.statusText);
        } else {
          console.log(req);
          setCarousel(req.data.results);
          setNewGames(newGames.data.results);
          setStatus("success");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  Prompt("Press control + S to open Side Menu from any page", "prompt");

  return carousel && newGames ? (
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
