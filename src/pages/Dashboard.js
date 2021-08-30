import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import SideBarMemoized from "../components/Sidebar";
import LoginButton from "../components/LoginButton";
import {
  Spinner,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Badge,
  Image,
} from "@chakra-ui/react";
import { useHistory, Link } from "react-router-dom";
import api from "../api/api";

const Title = styled.h1({
  textAlign: "center",
  fontSize: "2rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "3rem",
  marginTop: "1rem",
});

const Mygames = ({
  uncategorizedGames,
  notPlayedGames,
  finishedGames,
  currentlyPlayingGames,
}) => {
  return (
    <>
      <div>
        <Title>Uncategorized</Title>
        <div
          css={{ display: "grid", gridAutoFlow: "column dense", gap: "2rem" }}
        >
          {uncategorizedGames.map((game) => (
            <Link to={`/games/${game.id}`}>
              <div key={Math.random()} css={{ marginRight: "3rem" }}>
                <Box
                  w="27rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    h="241px"
                    w="100%"
                  />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {game.released}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {game.name}
                    </Box>
                  </Box>
                </Box>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Title>Currently playing</Title>
        <div
          css={{ display: "grid", gridAutoFlow: "column dense", gap: "2rem" }}
        >
          {currentlyPlayingGames.map((game) => (
            <Link to={`/games/${game.id}`}>
              <div key={Math.random()} css={{ marginRight: "3rem" }}>
                <Box
                  w="27rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    h="241px"
                    w="100%"
                  />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {game.released}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {game.name}
                    </Box>
                  </Box>
                </Box>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Title>Finished</Title>
        <div
          css={{ display: "grid", gridAutoFlow: "column dense", gap: "2rem" }}
        >
          {finishedGames.map((game) => (
            <Link to={`/games/${game.id}`}>
              <div key={Math.random()} css={{ marginRight: "3rem" }}>
                <Box
                  w="27rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    h="241px"
                    w="100%"
                  />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {game.released}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {game.name}
                    </Box>
                  </Box>
                </Box>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Title>Not played</Title>
        <div
          css={{ display: "grid", gridAutoFlow: "column dense", gap: "2rem" }}
        >
          {notPlayedGames.map((game) => (
            <Link to={`/games/${game.id}`}>
              <div key={Math.random()} css={{ marginRight: "3rem" }}>
                <Box
                  w="27rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    h="241px"
                    w="100%"
                  />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {game.released}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {game.name}
                    </Box>
                  </Box>
                </Box>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const Main = ({
  uncategorizedGames,
  notPlayedGames,
  finishedGames,
  currentlyPlayingGames,
}) => {
  return (
    <div
      css={{
        width: "100vw",
        maxHeight: "100vh",
        display: "grid",
        gridTemplateRows: "350px 1fr",
      }}
    >
      <div
        css={{
          backgroundColor: "#9999ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          Dashboard
        </h1>
      </div>
      <div css={{ padding: "4rem" }}>
        <Tabs isFitted variant="enclosed" colorScheme="facebook">
          <TabList>
            <Tab>My games</Tab>
            <Tab>Wishlist</Tab>
            <Tab>Collection</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Mygames
                uncategorizedGames={uncategorizedGames}
                currentlyPlayingGames={currentlyPlayingGames}
                finishedGames={finishedGames}
                notPlayedGames={notPlayedGames}
              />
            </TabPanel>
            <TabPanel>
              <p>Wishlist</p>
            </TabPanel>
            <TabPanel>
              <p>Collection</p>
            </TabPanel>
            <TabPanel>
              <p>Settings</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
const Heading = styled.h1({
  fontSize: "3rem",
  fontFamily: "Staatliches",
});

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const history = useHistory();

  const [uncategorizedGames, setUncategorizedGames] = React.useState([]);
  const [currentlyPlayingGames, setCurrentlyPlayingGames] = React.useState([]);
  const [finishedGames, setFinishedGames] = React.useState([]);
  const [notPlayedGames, setNotPlayedGames] = React.useState([]);

  const collection = useSelector((state) => state.profileDataApi.collection);
  const wishlist = useSelector((state) => state.profileDataApi.wishlist);

  const mygamesUncategorized = useSelector(
    (state) => state?.profileDataApi?.mygames?.uncategorized
  );
  const mygamesCurrentPlaying = useSelector(
    (state) => state?.profileDataApi?.mygames?.currentPlaying
  );
  const mygamesFinished = useSelector(
    (state) => state?.profileDataApi?.mygames?.finished
  );
  const mygamesnotPlayedYet = useSelector(
    (state) => state?.profileDataApi?.mygames?.notPlayedYet
  );

  const Output = () => {
    return (
      <div>
        <Main
          uncategorizedGames={uncategorizedGames}
          currentlyPlayingGames={currentlyPlayingGames}
          finishedGames={finishedGames}
          notPlayedGames={notPlayedGames}
        />
      </div>
    );
  };

  React.useEffect(() => {
    const fetch = async function () {
      let uncategorized = [];
      let currentPlaying = [];
      let notPlayedYet = [];
      let finished = [];
      try {
        await mygamesUncategorized.map(async (ele) => {
          let req = await api.get(`/games/${ele}`, {
            params: {
              id: ele,
              // search_precise: true,
            },
          });
          uncategorized.push(req.data);
          setUncategorizedGames(uncategorized);
        });
        await mygamesCurrentPlaying.map(async (ele) => {
          let req = await api.get(`/games/${ele}`, {
            params: {
              id: ele,
              // search_precise: true,
            },
          });
          currentPlaying.push(req.data);
          setCurrentlyPlayingGames(currentPlaying);
        });
        await mygamesFinished.map(async (ele) => {
          let req = await api.get(`/games/${ele}`, {
            params: {
              id: ele,
              // search_precise: true,
            },
          });
          finished.push(req.data);
          setFinishedGames(finished);
        });
        await mygamesnotPlayedYet.map(async (ele) => {
          let req = await api.get(`/games/${ele}`, {
            params: {
              id: ele,
              // search_precise: true,
            },
          });
          notPlayedYet.push(req.data);
          setNotPlayedGames(notPlayedYet);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [
    mygamesCurrentPlaying,
    mygamesFinished,
    mygamesUncategorized,
    mygamesnotPlayedYet,
  ]);
  console.log(`uncate`, uncategorizedGames);
  console.log(`current`, currentlyPlayingGames);
  console.log(`finished`, finishedGames);
  console.log(`notplayed`, notPlayedGames);
  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          {console.log(`mygamesUncategorized`)}
          <SideBarMemoized />
          <LoginButton />
          <Output />
        </div>
      ) : isLoggedIn === false && mygamesUncategorized ? (
        <div
          css={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "column",
          }}
        >
          <SideBarMemoized />
          <Heading>Please login to view this page </Heading>
          <Button
            colorScheme="white"
            variant="outline"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default React.memo(Dashboard);

//TODO: add a rest api server and host it on heroku. Store all users in it with id as the identifier and in that id store the user didToken, name, avatar and user's data like their wishlist, collection, etc.
//TODO: A option to show merge both accounts in the user dashboard if we have different mails in same userid/didId.
