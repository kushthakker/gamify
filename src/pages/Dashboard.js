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
      {console.log(`mygames`)}
      <div>
        <Title>Uncategorized</Title>
        {uncategorizedGames.map((game) => (
          <React.Fragment key={Math.random()}>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                justifyContent: "space-between",
                gridAutoFlow: "dense row",
                gridTemplateRows: "masonry",
                masonryAutoFlow: "next",
                columnGap: "1.5rem",
                rowGap: "2.5rem",
                padding: "2rem",
              }}
            >
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
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        {currentlyPlayingGames.map((game) => (
          <React.Fragment key={Math.random()}>
            <Title>Currently playing</Title>
            <div
              css={{
                display: "grid",
                gridAutoFlow: "column dense",
                gap: "2rem",
              }}
            >
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
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        {finishedGames.map((game) => (
          <React.Fragment key={Math.random()}>
            <Title>Finished</Title>
            <div
              css={{
                display: "grid",
                gridAutoFlow: "column dense",
                gap: "2rem",
              }}
            >
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
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        {notPlayedGames.map((game) => (
          <React.Fragment key={Math.random()}>
            <Title>Not played</Title>
            <div
              css={{
                display: "grid",
                gridAutoFlow: "column dense",
                gap: "2rem",
              }}
            >
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
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const MyWishlist = ({ wishlist }) => {
  return (
    <div>
      {console.log(`wishlist`)}
      <Title>Wishlist</Title>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyContent: "space-between",
          gridAutoFlow: "dense row",
          gridTemplateRows: "masonry",
          masonryAutoFlow: "next",
          columnGap: "1.5rem",
          rowGap: "2.5rem",
          padding: "2rem",
        }}
      >
        {wishlist.map((game) => (
          <div key={Math.random()}>
            <Link to={`/games/${game.id}`}>
              <div css={{ marginRight: "3rem" }}>
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
                      {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
          </div>
        ))}
      </div>
    </div>
  );
};

const MyCollection = ({ collection }) => {
  return (
    <div>
      <Title>Collection</Title>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyContent: "space-between",
          gridAutoFlow: "dense row",
          gridTemplateRows: "masonry",
          masonryAutoFlow: "next",
          columnGap: "1.5rem",
          rowGap: "2.5rem",
          padding: "2rem",
        }}
      >
        {collection.map((game) => (
          <React.Fragment key={Math.random()}>
            <div>
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
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
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
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Main = ({
  uncategorizedGames,
  notPlayedGames,
  finishedGames,
  currentlyPlayingGames,
  wishlist,
  collection,
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
              <MyWishlist wishlist={wishlist} />
            </TabPanel>
            <TabPanel>
              <MyCollection collection={collection} />
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
  const [saveWishlist, setSaveWishlist] = React.useState([]);
  const [saveCollection, setSaveCollection] = React.useState([]);

  const collectionState = useSelector(
    (state) => state?.profileDataApi?.collection
  );
  const wishlistState = useSelector((state) => state?.profileDataApi?.wishlist);
  const id = useSelector((state) => state?.profileDataApi?.id);

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
          collection={saveCollection}
          wishlist={saveWishlist}
        />
      </div>
    );
  };

  React.useLayoutEffect(() => {
    const fetch = async function () {
      let uncategorized = [];
      let currentPlaying = [];
      let notPlayedYet = [];
      let finished = [];
      let collection = [];
      let wishlist = [];
      if (id) {
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
          await collectionState.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            collection.push(req.data);
            setSaveCollection(collection);
          });

          await wishlistState.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            wishlist.push(req.data);

            // return wishlist;
            if (wishlist.length === wishlistState.length)
              setSaveWishlist(wishlist);
          });

          console.log("coll", collection);
          console.log("wish", wishlist);

          console.log(`wishlist saved`, wishlist);
        } catch (err) {
          console.log(err);
        }
      } else {
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
        </div>;
      }
    };

    fetch();
  }, [
    collectionState,
    id,
    mygamesCurrentPlaying,
    mygamesFinished,
    mygamesUncategorized,
    mygamesnotPlayedYet,
    wishlistState,
  ]);

  console.log(`wishlist`, saveWishlist);
  console.log(`collection`, saveCollection);

  return (
    <div>
      {isLoggedIn === true &&
      mygamesUncategorized &&
      collectionState &&
      wishlistState ? (
        <div>
          {console.log(`mygamesUncategorized`)}
          <SideBarMemoized />
          <LoginButton />
          <Output />
        </div>
      ) : isLoggedIn === false ? (
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

export default Dashboard;

//TODO: add a rest api server and host it on heroku. Store all users in it with id as the identifier and in that id store the user didToken, name, avatar and user's data like their wishlist, collection, etc.
//TODO: A option to show merge both accounts in the user dashboard if we have different mails in same userid/didId.
